module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
};