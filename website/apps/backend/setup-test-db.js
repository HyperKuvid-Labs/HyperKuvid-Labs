const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function setupTestDatabase() {
  console.log('🗄️ Setting up test database...');
  
  // Clean existing data
  await prisma.userProject.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  
  // Create test admin user
  const hashedPassword = await bcrypt.hash('Mantis@2510', 10);
  await prisma.user.create({
    data: {
      id: 'test-admin-123',
      name: 'Test Admin',
      email: 'pradheep.raop@gmail.com',
      password: hashedPassword,
      level: 'ADMIN',
      lastSeen: new Date()
    }
  });
  
  // Create test regular user
  const hashedUserPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      id: 'test-user-123',
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedUserPassword,
      level: 'GENERAL',
      lastSeen: new Date()
    }
  });
  
  console.log('✅ Test database setup complete');
}

if (require.main === module) {
  setupTestDatabase()
    .finally(() => prisma.$disconnect());
}

module.exports = { setupTestDatabase };
