var fs = require('fs');
var path = require('path');
var rimrafSync = require('rimraf').sync;
var programm = require('../lib/dts-only');

var eol = /\r?\n?/g;

function r(way) {
  return path.resolve(__dirname, way);
}

function getOpts(type) {
  var sample = path.join('__tests__/sample', type);

  return {
    project: path.join(sample, 'tsconfig.json'),
    outDir: path.join('__tests__/compiled', type)
  }
}

describe('dts-only', function () {
  var code1;
  var code2;

  beforeAll(function () {
    var source1 = fs.readFileSync(r('fixtures/code1.d.ts'), 'utf8');
    var source2 = fs.readFileSync(r('fixtures/code2.d.ts'), 'utf8');

    code1 = source1.replace(eol, '');
    code2 = source2.replace(eol, '');
  });

  afterAll(function () {
    rimrafSync(r('compiled'));
  });

  it('should compile only d.ts files from typescript source', function () {
    programm(getOpts('default'));

    var source1 = fs.readFileSync(r('compiled/default/code1.d.ts'), 'utf8');

    expect(source1.replace(eol, '')).toEqual(code1);
  });

  it('should compile multiple d.ts mentioned in tsconfig "include" section', function () {
    programm(getOpts('multiple-include'));

    var source1 = fs.readFileSync(r('compiled/multiple-include/1/code1.d.ts'), 'utf8');
    var source2 = fs.readFileSync(r('compiled/multiple-include/2/code2.d.ts'), 'utf8');

    expect(source1.replace(eol, '')).toEqual(code1);
    expect(source2.replace(eol, '')).toEqual(code2);
  });

  it('should exclude paths from sending to compile basing on tsconfig "exclude" section', function () {
    programm(getOpts('exclude'));

    var isSource1Exists = fs.existsSync(r('compiled/exclude/excluded/code1.d.ts'));
    var source2 = fs.readFileSync(r('compiled/exclude/code2.d.ts'), 'utf8');

    expect(isSource1Exists).not.toBeTruthy();
    expect(source2.replace(eol, '')).toEqual(code2);
  });

  it('should compile files defined in tsconfig "files" section', function () {
    programm(getOpts('files'));

    var source1 = fs.readFileSync(r('compiled/files/code1.d.ts'), 'utf8');
    var source2 = fs.readFileSync(r('compiled/files/code2.d.ts'), 'utf8');

    expect(source1.replace(eol, '')).toEqual(code1);
    expect(source2.replace(eol, '')).toEqual(code2);
  });
});
