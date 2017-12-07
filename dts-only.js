var glob = require('glob');
var path = require('path');
var tsc = require('typescript');

var cwd = process.cwd();

function globalize(includes, callback) {
  var result = [];
  var count = includes.length - 1;

  for (var i = 0, len = includes.length; i < len; i++) {
    var p = includes[i];

    glob(p, function processPaths(err, paths) {
      if (err) {
        callback(err);
      }

      for (var j = 0, len2 = paths.length; j < len2; j++) {
        result.push(paths[j]);
      }

      if (count === 0) {
        callback(undefined, result);
      } else {
        count--;
      }
    });
  }
}

function prepareIncludes(includes, tsconfigDir) {
  return includes.map(function (i) {
    return path.relative(cwd, path.resolve(tsconfigDir, i));
  });
}

function dtsOnly(options, callback) {
  var moduleType = options.module;
  var outDir = options.outDir;
  var project = options.project;
  var target = options.target;

  var tsconfigPath = path.resolve(cwd, project);
  var tsconfig = require(tsconfigPath);

  if (!tsconfig.include) {
    throw new Error('No "include" section found in tsconfig.json');
  }

  var compilerOptions = tsconfig.compilerOptions;

  if (moduleType) {
    compilerOptions.module = moduleType;
  }

  if (outDir) {
    compilerOptions.outDir = outDir;
  }

  if (target) {
    compilerOptions.target = target;
  }

  globalize(
    prepareIncludes(tsconfig.include, path.dirname(tsconfigPath)),
    function compile(err, paths) {
      if (err) {
        throw err;
      }

      var program = tsc.createProgram(paths, compilerOptions);
      program.emit(undefined, undefined, undefined, true);

      callback();
    }
  );
}

module.exports = dtsOnly;
