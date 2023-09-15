module.exports = {
  rootDir: '../../../',
  globalSetup: './__tests__/v1/pre-tests/jest.globalSetup.js',
  globalTeardown: './__tests__/v1/pos-tests/jest.globalTeardown.js',
  testPathIgnorePatterns: [
    './__tests__/v1/config',
    './__tests__/v1/shared',
    './__tests__/v1/pre-tests/jest.globalSetup.js',
    './__tests__/v1/pos-tests/jest.globalTeardown.js'
  ]
};
