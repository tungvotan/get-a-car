export default {
  preset: 'ts-jest', // Use ts-jest for processing TypeScript files
  testEnvironment: 'node', // Set the environment to Node.js
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js'], // Allow importing .ts and .js files in tests
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Look for test files
  clearMocks: true, // Automatically clear mock calls and instances between every test
};
