var fs = require('fs');
var path = require('path');
var tsc = require('typescript');

var cwd = process.cwd();

const parseConfigHost = {
    fileExists: fs.existsSync,
    readDirectory: tsc.sys.readDirectory,
    readFile: function (file) {
      return fs.readFileSync(file, 'utf8');
    },
    useCaseSensitiveFileNames: true
};

function dtsOnly(options) {
  var outDir = options.outDir;
  var project = options.project;

  var tsconfigPath = path.resolve(cwd, project);
  var tsconfig = require(tsconfigPath);

  var parsed = tsc.parseJsonConfigFileContent(
    tsconfig,
    parseConfigHost,
    path.dirname(tsconfigPath),
    outDir
      ? {outDir: outDir}
      : undefined
  );

  var program = tsc.createProgram(parsed.fileNames, parsed.options);
  program.emit(undefined, undefined, undefined, true);
}

module.exports = dtsOnly;
