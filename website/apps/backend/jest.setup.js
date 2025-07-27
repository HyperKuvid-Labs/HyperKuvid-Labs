// jest.setup.js
process.env.NODE_ENV = 'test';

// Set your environment variables for testing
process.env.JWT_SECRET = 'SeCr3tKeyHkL789';
process.env.GEMINI_API_KEY = 'AIstuvGh34469274q0fnaoq';
process.env.HKL_GMAIL = 'hyperkuvidlabs@gmail.com';
process.env.ADMIN1_GMAIL = 'mantissa6789@gmail.com';
process.env.ADMIN2_GMAIL = 'yuvanesh.ykv@gmail.com';
process.env.ADMIN3_GMAIL = 'harishkb20205@gmail.com';

// Set test timeout
jest.setTimeout(30000);

// Mock external dependencies that cause issues
jest.mock('./personal_bot', () => ({
  queryFromServer: jest.fn().mockResolvedValue('mocked response')
}));

// Suppress console logs during testing
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
