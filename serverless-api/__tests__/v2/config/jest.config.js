module.exports = {
  rootDir: '../../../',
  globalSetup: './__tests__/v2/pre-tests/jest.globalSetup.js',
  globalTeardown: './__tests__/v2/pos-tests/jest.globalTeardown.js',
  testPathIgnorePatterns: [
    './__tests__/v2/config',
    './__tests__/v2/shared',
    './__tests__/v2/pre-tests/jest.globalSetup.js',
    './__tests__/v2/pos-tests/jest.globalTeardown.js'
  ]
};
