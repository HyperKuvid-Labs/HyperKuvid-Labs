module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '*.{js,ts}',
    '!node_modules/**',
    '!coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
    '!prisma/**',
    '!personal_bot.ts'
  ],
  testMatch: [
    '**/api.test.js',
    '**/integration.test.js' 
  ],
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  testTimeout: 30000,
  transformIgnorePatterns: [
    'node_modules/(?!(supertest)/)'
  ]
};
