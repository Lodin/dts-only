var path = require('path');

var cwd = process.cwd();

module.exports = {
  collectCoverageFrom: [
    'dts-only.js'
  ],
  mapCoverage: true,
  moduleFileExtensions: [
    'js'
  ],
  rootDir: cwd,
  testMatch: [
    path.resolve(cwd, '__tests__/**/*.js')
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost'
};
