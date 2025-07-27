// __tests__/api.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
};

jest.mock('bcrypt', () => mockBcrypt);

// Mock Prisma Client
const mockPrismaClient = {
  user: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  project: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
  userProject: {
    create: jest.fn(),
  },
};

// Mock nodemailer
const mockTransporter = {
  sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient),
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => mockTransporter),
}));

// jest.mock('bcrypt', () => ({
//   hash: jest.fn(),
//   compare: jest.fn(),
// }));

jest.mock('./personal_bot', () => ({
  queryFromServer: jest.fn().mockResolvedValue('mocked response')
}));

// Import the app after mocking
let app;

describe('Express API Test Suite', () => {
  let testResults = [];
  let passedTests = 0;
  let failedTests = 0;
  
  beforeAll(async () => {
    // Import app after all mocks are set up
    try {
      const appModule = require('./index.ts');
      app = appModule.default || appModule;
      
      if (!app || typeof app.listen !== 'function') {
        throw new Error('App is not a valid Express application');
      }
    } catch (error) {
      console.error('Failed to import app:', error);
      throw error;
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset bcrypt mocks
    mockBcrypt.hash.mockReset();
    mockBcrypt.compare.mockReset();
  });

  afterEach(() => {
    const testName = expect.getState().currentTestName;
    
    // Check if test has already been recorded as failed
    const alreadyRecorded = testResults.some(result => result.name === testName);
    
    if (!alreadyRecorded) {
      // Test passed (no failure was recorded)
      testResults.push({
        name: testName,
        status: 'PASSED',
        timestamp: new Date().toISOString(),
        error: null
      });
      passedTests++;
    }
  });

  afterAll(async () => {
    generateMarkdownReport();

    console.log(`\n📊 Test Summary: ${passedTests} passed, ${failedTests} failed`);
    console.log(`📄 Report saved to: unit-test-report.md`);
  });

  // Utility function to generate JWT token
  const generateToken = (userId, email, level = 'GENERAL') => {
    return jwt.sign(
      { userId, email, level },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  };

  describe('Basic Endpoints', () => {
    test('GET / should return welcome message', async () => {
      try {
        const response = await request(app)
          .get('/')
          .expect(200);
        
        expect(response.text).toBe("Welcome to HyperKuvid-Lab's Kitchen");
      } catch (error) {
        handleTestFailure('GET / should return welcome message', error);
        throw error;
      }
    });

    test('GET /health should return health status', async () => {
      try {
        const response = await request(app)
          .get('/health')
          .expect(200);
        
        expect(response.body).toEqual({ status: 'OK' });
      } catch (error) {
        handleTestFailure('GET /health should return health status', error);
        throw error;
      }
    });
  });

  describe('User Registration', () => {
    test('POST /register/user should register new user successfully', async () => {
      try {
        const userData = {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        };

        // Mock Prisma responses
        mockPrismaClient.user.findFirst.mockResolvedValue(null); // User doesn't exist
        mockPrismaClient.user.create.mockResolvedValue({
          id: 'user-id-123',
          name: userData.name,
          email: userData.email,
          level: 'GENERAL',
          lastSeen: new Date()
        });

        // Mock bcrypt
        mockBcrypt.hash.mockResolvedValue('hashed-password');

        const response = await request(app)
          .post('/register/user')
          .send(userData)
          .expect(201);

        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.token).toBeDefined();
        expect(mockPrismaClient.user.findFirst).toHaveBeenCalledWith({
          where: { email: userData.email }
        });
        expect(mockPrismaClient.user.create).toHaveBeenCalled();
      } catch (error) {
        handleTestFailure('POST /register/user should register new user successfully', error);
        throw error;
      }
    });

    test('POST /register/user should return error for existing user', async () => {
      try {
        const userData = {
          name: 'Existing User',
          email: 'existing@example.com',
          password: 'password123'
        };

        // Mock existing user
        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'existing-user-id',
          email: userData.email
        });

        const response = await request(app)
          .post('/register/user')
          .send(userData)
          .expect(400);

        expect(response.body.error).toBe('User already exists.');
      } catch (error) {
        handleTestFailure('POST /register/user should return error for existing user', error);
        throw error;
      }
    });
  });

  describe('User Login', () => {
    test('POST /user/login should login user successfully', async () => {
      try {
        const loginData = {
          email: 'test@example.com',
          password: 'password123'
        };

        // Mock user exists
        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'user-id-123',
          name: 'Test User',
          email: loginData.email,
          password: 'hashed-password',
          level: 'GENERAL'
        });

        // Mock password comparison
        mockBcrypt.compare.mockResolvedValue(true);

        // Mock user update
        mockPrismaClient.user.update.mockResolvedValue({});

        const response = await request(app)
          .post('/user/login')
          .send(loginData)
          .expect(200);

        expect(response.body.message).toBe('User Logged in Successfully');
        expect(response.body.user.email).toBe(loginData.email);
        expect(response.body.token).toBeDefined();
      } catch (error) {
        handleTestFailure('POST /user/login should login user successfully', error);
        throw error;
      }
    });

    test('POST /user/login should return error for non-existent user', async () => {
      try {
        const loginData = {
          email: 'nonexistent@example.com',
          password: 'password123'
        };

        mockPrismaClient.user.findFirst.mockResolvedValue(null);

        const response = await request(app)
          .post('/user/login')
          .send(loginData)
          .expect(400);

        expect(response.body.error).toBe('User not found.');
      } catch (error) {
        handleTestFailure('POST /user/login should return error for non-existent user', error);
        throw error;
      }
    });

    test('POST /user/login should return error for invalid password', async () => {
      try {
        const loginData = {
          email: 'test@example.com',
          password: 'wrongpassword'
        };

        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'user-id-123',
          email: loginData.email,
          password: 'hashed-password',
          level: 'GENERAL'
        });

        mockBcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
          .post('/user/login')
          .send(loginData)
          .expect(400);

        expect(response.body.error).toBe('Invalid password.');
      } catch (error) {
        handleTestFailure('POST /user/login should return error for invalid password', error);
        throw error;
      }
    });

    test('POST /user/login should redirect admin users', async () => {
      try {
        const loginData = {
          email: 'admin@example.com',
          password: 'password123'
        };

        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'admin-id-123',
          email: loginData.email,
          password: 'hashed-password',
          level: 'ADMIN'
        });

        mockBcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
          .post('/user/login')
          .send(loginData)
          .expect(400);

        expect(response.body.message).toBe('Please Login with admin page');
      } catch (error) {
        handleTestFailure('POST /user/login should redirect admin users', error);
        throw error;
      }
    });
  });

  describe('Admin Login', () => {
    test('POST /admin/login should login admin successfully', async () => {
      try {
        const adminData = {
          email: 'pradheep.raop@gmail.com',
          password: 'Mantis@2510'
        };

        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'admin-id-123',
          name: 'Admin User',
          email: adminData.email,
          password: 'hashed-password',
          level: 'ADMIN'
        });

        mockBcrypt.compare.mockResolvedValue(true);
        mockPrismaClient.user.update.mockResolvedValue({});

        const response = await request(app)
          .post('/admin/login')
          .send(adminData)
          .expect(200);

        expect(response.body.message).toBe('Admin Logged in Successfully');
        expect(response.body.user.email).toBe(adminData.email);
        expect(response.body.token).toBeDefined();
      } catch (error) {
        handleTestFailure('POST /admin/login should login admin successfully', error);
        throw error;
      }
    });

    test('POST /admin/login should redirect non-admin users', async () => {
      try {
        const userData = {
          email: 'user@example.com',
          password: 'password123'
        };

        mockPrismaClient.user.findFirst.mockResolvedValue({
          id: 'user-id-123',
          email: userData.email,
          password: 'hashed-password',
          level: 'GENERAL'
        });

        mockBcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
          .post('/admin/login')
          .send(userData)
          .expect(400);

        expect(response.body.message).toBe('Please Login with user page');
      } catch (error) {
        handleTestFailure('POST /admin/login should redirect non-admin users', error);
        throw error;
      }
    });
  });

  describe('Project Management', () => {
    test('POST /project/add/:userId should add project successfully', async () => {
      try {
        const userId = 'user-id-123';
        const token = generateToken(userId, 'test@example.com');
        
        const projectData = {
          title: 'Test Project',
          description: 'A test project',
          githubLink: 'https://github.com/test/project',
          story: 'Project story',
          documentation: 'https://docs.test.com',
          domain: 'Web Development',
          techstack: 'React, Node.js',
          creators: ['creator-id-1', 'creator-id-2']
        };

        // Mock Prisma responses
        mockPrismaClient.user.findUnique.mockResolvedValue({
          id: userId,
          name: 'Test User',
          email: 'test@example.com'
        });

        mockPrismaClient.project.create.mockResolvedValue({ id: 'project-id-123' });
        mockPrismaClient.project.findFirst.mockResolvedValue({ id: 'project-id-123' });
        mockPrismaClient.userProject.create.mockResolvedValue({});

        const response = await request(app)
          .post(`/project/add/${userId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(projectData)
          .expect(201);

        expect(mockPrismaClient.project.create).toHaveBeenCalled();
        expect(mockTransporter.sendMail).toHaveBeenCalled();
      } catch (error) {
        handleTestFailure('POST /project/add/:userId should add project successfully', error);
        throw error;
      }
    });

    test('POST /project/add/:userId should return 401 without token', async () => {
      try {
        const userId = 'user-id-123';
        const projectData = {
          title: 'Test Project',
          description: 'A test project'
        };

        const response = await request(app)
          .post(`/project/add/${userId}`)
          .send(projectData)
          .expect(401);

        expect(response.body.error).toBe('Access token required');
      } catch (error) {
        handleTestFailure('POST /project/add/:userId should return 401 without token', error);
        throw error;
      }
    });

    test('POST /project/add/:userId should return 403 for mismatched user', async () => {
      try {
        const userId = 'user-id-123';
        const differentUserId = 'different-user-id';
        const token = generateToken(differentUserId, 'different@example.com');
        
        const projectData = {
          title: 'Test Project',
          description: 'A test project'
        };

        const response = await request(app)
          .post(`/project/add/${userId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(projectData)
          .expect(403);

        expect(response.body.error).toBe('Access denied. You can only add projects for yourself.');
      } catch (error) {
        handleTestFailure('POST /project/add/:userId should return 403 for mismatched user', error);
        throw error;
      }
    });
  });

  describe('Authentication Middleware', () => {
    test('should validate JWT token correctly', async () => {
      try {
        const userId = 'user-id-123';
        const validToken = generateToken(userId, 'test@example.com');

        // Mock user and project data for successful request
        mockPrismaClient.user.findUnique.mockResolvedValue({
          id: userId,
          name: 'Test User',
          email: 'test@example.com'
        });

        const response = await request(app)
          .post(`/project/add/${userId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            title: 'Test Project',
            description: 'Test Description',
            githubLink: 'https://github.com/test/repo',
            creators: []
          });

        // Should not return 401 or 403 for authentication issues
        expect(response.status).not.toBe(401);
        expect(response.status).not.toBe(403);
      } catch (error) {
        handleTestFailure('should validate JWT token correctly', error);
        throw error;
      }
    });

    test('should reject invalid JWT token', async () => {
      try {
        const userId = 'user-id-123';
        const invalidToken = 'invalid-token';

        const response = await request(app)
          .post(`/project/add/${userId}`)
          .set('Authorization', `Bearer ${invalidToken}`)
          .send({
            title: 'Test Project',
            description: 'Test Description'
          })
          .expect(403);

        expect(response.body.error).toBe('Invalid or expired token');
      } catch (error) {
        handleTestFailure('should reject invalid JWT token', error);
        throw error;
      }
    });
  });

  // Helper function to handle test failures
  function handleTestFailure(testName, error) {
    const alreadyRecorded = testResults.some(result => result.name === testName);
    
    if (!alreadyRecorded) {
      testResults.push({
        name: testName,
        status: 'FAILED',
        timestamp: new Date().toISOString(),
        error: error.message || error.toString()
      });
      failedTests++;
    }
  }

  // Generate markdown report
  function generateMarkdownReport() {
    const totalTests = passedTests + failedTests;
    const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : 0;
    
    const reportContent = `# API Test Report

## Test Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | ${totalTests} |
| **Passed** | ${passedTests} |
| **Failed** | ${failedTests} |
| **Pass Rate** | ${passRate}% |
| **Execution Date** | ${new Date().toISOString()} |

## Test Results Overview

### ✅ Passed Tests: ${passedTests}
### ❌ Failed Tests: ${failedTests}

---

## Detailed Test Results

${testResults.map(test => `
### ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}

**Status:** ${test.status}  
**Timestamp:** ${test.timestamp}  
${test.error ? `**Error:** \`${test.error}\`  ` : ''}
${test.status === 'PASSED' ? '**Result:** Test executed successfully' : ''}

---
`).join('')}

## Test Categories Coverage

### Basic Endpoints
- [${testResults.find(t => t.name.includes('GET /'))?.status === 'PASSED' ? 'x' : ' '}] Welcome endpoint (/)
- [${testResults.find(t => t.name.includes('/health'))?.status === 'PASSED' ? 'x' : ' '}] Health check endpoint

### User Management
- [${testResults.find(t => t.name.includes('register new user'))?.status === 'PASSED' ? 'x' : ' '}] User registration
- [${testResults.find(t => t.name.includes('existing user'))?.status === 'PASSED' ? 'x' : ' '}] Duplicate user handling
- [${testResults.find(t => t.name.includes('login user successfully'))?.status === 'PASSED' ? 'x' : ' '}] User login
- [${testResults.find(t => t.name.includes('non-existent user'))?.status === 'PASSED' ? 'x' : ' '}] Invalid user handling
- [${testResults.find(t => t.name.includes('invalid password'))?.status === 'PASSED' ? 'x' : ' '}] Password validation

### Admin Management
- [${testResults.find(t => t.name.includes('login admin'))?.status === 'PASSED' ? 'x' : ' '}] Admin login
- [${testResults.find(t => t.name.includes('redirect non-admin'))?.status === 'PASSED' ? 'x' : ' '}] User role validation

### Project Management
- [${testResults.find(t => t.name.includes('add project successfully'))?.status === 'PASSED' ? 'x' : ' '}] Project creation
- [${testResults.find(t => t.name.includes('without token'))?.status === 'PASSED' ? 'x' : ' '}] Authentication required
- [${testResults.find(t => t.name.includes('mismatched user'))?.status === 'PASSED' ? 'x' : ' '}] User authorization

### Security & Middleware
- [${testResults.find(t => t.name.includes('validate JWT'))?.status === 'PASSED' ? 'x' : ' '}] JWT validation
- [${testResults.find(t => t.name.includes('invalid JWT'))?.status === 'PASSED' ? 'x' : ' '}] Invalid token handling

## Mocking Coverage

- ✅ Prisma Client (Database operations)
- ✅ Nodemailer (Email sending)
- ✅ bcrypt (Password hashing)
- ✅ JWT (Token generation/validation)

## Recommendations

${failedTests > 0 ? `
### 🔍 Failed Tests Analysis
${testResults.filter(t => t.status === 'FAILED').map(test => `
- **${test.name}**: ${test.error}
`).join('')}

### 🛠️ Suggested Actions
- Review and fix the failing test cases
- Ensure all mocks are properly configured
- Verify API endpoint implementations
- Check authentication middleware logic
` : `
### 🎉 All Tests Passed!
Your API is working correctly with all endpoints properly tested.

### 🚀 Next Steps
- Consider adding integration tests
- Add performance testing
- Implement API documentation testing
- Add security testing (rate limiting, input validation)
`}

---

*Report generated by Jest Test Suite on ${new Date().toLocaleString()}*
`;

    const reportPath = path.join(process.cwd(), 'unit-test-report.md');
    fs.writeFileSync(reportPath, reportContent);
    console.log(`\n📊 Test report generated: ${reportPath}`);
  }
});
