var fs = require('fs');
var path = require('path');
var programm = require('../dts-only');

var eol = /\r?\n?/g;

function r(way) {
  return path.resolve(__dirname, way);
}

function asyncReadFile(path, check, notDone, done, load) {
  fs.readFile(path, 'utf8', function (err, source) {
    if (err) {
      throw err;
    }

    load(source.replace(eol, ''));

    if (check()) {
      done();
    } else {
      notDone();
    }
  });
}

describe('dts-only', function () {
  var code1;
  var code2;

  beforeAll(function (done) {
    var isAnotherCompleted = false;

    var check = function () { return isAnotherCompleted; };
    var notDone = function () { isAnotherCompleted = true; };

    asyncReadFile(r('fixtures/code1.d.ts'), check, notDone, done, function (source) {
      code1 = source;
    });

    asyncReadFile(r('fixtures/code2.d.ts'), check, notDone, done, function (source) {
      code2 = source;
    });
  });

  it('should compile only d.ts files from typescript source', function (done) {
    programm({
      project: '__tests__/sample/default/tsconfig.json',
      outDir: '__tests__/compiled/default'
    }, function () {
      fs.readFile(r('compiled/default/code1.d.ts'), 'utf8', function (err, source) {
        if (err) {
          throw err;
        }

        expect(source.replace(eol, ''))
          .toEqual(code1);
        done();
      });
    });
  });

  it('should compile multiple d.ts mentioned in tsconfig "include" section', function (done) {
    var isAnotherCompleted = false;

    var check = function () { return isAnotherCompleted; };
    var notDone = function () { isAnotherCompleted = true; };

    programm({
      project: '__tests__/sample/multiple-include/tsconfig.json',
      outDir: '__tests__/compiled/multiple-include'
    }, function () {
      asyncReadFile(r('compiled/multiple-include/code1.d.ts'), check, notDone, done, function (source) {
        expect(source.replace(eol, '')).toEqual(code1);
      });

      asyncReadFile(r('compiled/multiple-include/code2.d.ts'), check, notDone, done, function (source) {
        expect(source.replace(eol, '')).toEqual(code2);
      });
    });
  });
});
