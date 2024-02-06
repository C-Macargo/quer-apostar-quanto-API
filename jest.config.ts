module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};