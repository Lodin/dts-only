var fs = require('fs');
var path = require('path');
var programm = require('../dts-only');

var eol = /\r?\n?/g;

function compareCompiledAndFixture(compiledPath, fixturePath, callback) {
  var fullCompiledPath = path.resolve(__dirname, compiledPath);
  var fullFixturePath = path.resolve(__dirname, fixturePath);

  fs.readFile(fullCompiledPath, 'utf8', function (err, compiled) {
    if (err) {
      throw err;
    }

    var compiledWithoutEol = compiled.replace(eol, '');

    fs.readFile(fullFixturePath, 'utf8', function (err, fixture) {
      if (err) {
        throw err;
      }

      var fixtureWithoutEol = fixture.replace(eol, '');

      expect(compiledWithoutEol).toEqual(fixtureWithoutEol);

      if (callback) {
        callback();
      }
    });
  });
}

describe('dts-only', function () {
  it('should compile only d.ts files from typescript source', function (done) {
    programm({
      project: '__tests__/sample/default/tsconfig.json',
      outDir: '__tests__/compiled/default'
    }, function () {
      compareCompiledAndFixture(
        'compiled/default/code.d.ts',
        'fixtures/default/code.d.ts',
        done
      );
    });
  });

  it('should compile multiple d.ts mentioned in tsconfig "include" section', function (done) {
    var testSecond = function () {
      compareCompiledAndFixture(
        'compiled/multiple-include/code2.d.ts',
        'fixtures/multiple-include/code2.d.ts',
        done
      );
    };

    var testFirst = function () {
      compareCompiledAndFixture(
        'compiled/multiple-include/code1.d.ts',
        'fixtures/multiple-include/code1.d.ts',
        testSecond
      );
    };

    programm({
      project: '__tests__/sample/multiple-include/tsconfig.json',
      outDir: '__tests__/compiled/multiple-include'
    }, testFirst);
  });
});
