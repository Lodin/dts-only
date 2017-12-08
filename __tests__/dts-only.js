var fs = require('fs');
var path = require('path');
var programm = require('../lib/dts-only');
var parallel = require('../lib/parallel');

var eol = /\r?\n?/g;

function r(way) {
  return path.resolve(__dirname, way);
}

describe('dts-only', function () {
  var code1;
  var code2;

  beforeAll(function (done) {
    parallel([
      function (check) {
        fs.readFile(r('fixtures/code1.d.ts'), 'utf8', function (err, source) {
          if (err) throw err;
          code1 = source.replace(eol, '');

          check();
        });
      },
      function (check) {
        fs.readFile(r('fixtures/code2.d.ts'), 'utf8', function (err, source) {
          if (err) throw err;
          code2 = source.replace(eol, '');

          check();
        });
      }
    ], function() {
      done();
    })
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

        expect(source.replace(eol, '')).toEqual(code1);
        done();
      });
    });
  });

  it('should compile multiple d.ts mentioned in tsconfig "include" section', function (done) {
    programm({
      project: '__tests__/sample/multiple-include/tsconfig.json',
      outDir: '__tests__/compiled/multiple-include'
    }, function () {
      parallel([
        function (check) {
          fs.readFile(r('compiled/multiple-include/code1.d.ts'), 'utf8', function (err, source) {
            if (err) throw err;
            expect(source.replace(eol, '')).toEqual(code1);

            check();
          });
        },
        function (check) {
          fs.readFile(r('compiled/multiple-include/code2.d.ts'), 'utf8', function (err, source) {
            if (err) throw err;
            expect(source.replace(eol, '')).toEqual(code2);

            check();
          });
        }
      ], function () {
        done();
      });
    });
  });

  it('should exclude paths from sending to compile basing on tsconfig "exclude" section', function (done) {
    programm({
      project: '__tests__/sample/exclude/tsconfig.json',
      outDir: '__tests__/compiled/exclude'
    }, function () {
      parallel([
        function (check) {
          fs.readFile(r('compiled/exclude/code2.d.ts'), 'utf8', function (err, source) {
            if (err) throw err;

            expect(source.replace(eol, '')).toEqual(code2);

            check();
          });
        },
        function (check) {
          fs.exists(r('compiled/exclude/excludes/code1.d.ts'), function (err, result) {
            expect(result).not.toBeTruthy();

            check();
          });
        }
      ], function () {
        done();
      });
    });
  });

  it('should compile files defined in tsconfig "files" section', function (done) {
    programm({
      project: '__tests__/sample/files/tsconfig.json',
      outDir: '__tests__/compiled/files'
    }, function () {
      parallel([
        function (check) {
          fs.readFile(r('compiled/files/code1.d.ts'), 'utf8', function (err, source) {
            if (err) throw err;

            expect(source.replace(eol, '')).toEqual(code1);

            check();
          });
        },
        function (check) {
          fs.exists(r('compiled/files/code2.d.ts'), function (err, result) {
            expect(result).not.toBeTruthy();

            check();
          });
        }
      ], function () {
        done();
      });
    });
  });
});
