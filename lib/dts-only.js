var glob = require('glob');
var path = require('path');
var tsc = require('typescript');
var parallel = require('./parallel');

var cwd = process.cwd();

function globalize(paths, callback) {
  var result = [];
  var len = paths.length;

  var parallels = new Array(len);
  var loop = function (i) {
    parallels[i] = function (check) {
      glob(paths[i], function processPaths(err, globalizedPaths) {
        if (err) {
          callback(err);
        }

        check(globalizedPaths);
      });
    }
  };

  for (var i = 0; i < len; i++) {
    loop(i);
  }

  parallel(parallels, function (res) {
    for (var i = 0, leni = res.length; i < leni; i++) {
      for (var j = 0, lenj = res[i].length; j < lenj; j++) {
        result.push(res[i][j]);
      }
    }

    callback(undefined, result);
  });
}

function preparePaths(paths, tsconfigDir) {
  return paths.map(function (i) {
    return path.relative(cwd, path.resolve(tsconfigDir, i));
  });
}

function compile(paths, compilerOptions) {
  var program = tsc.createProgram(paths, compilerOptions);
  program.emit(undefined, undefined, undefined, true);
}

function dtsOnly(options, callback) {
  var moduleType = options.module;
  var outDir = options.outDir;
  var project = options.project;
  var target = options.target;

  var tsconfigPath = path.resolve(cwd, project);
  var tsconfig = require(tsconfigPath);

  if (!tsconfig.include && !tsconfig.files) {
    throw new Error('No "include" or "files" section found in tsconfig.json');
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

  var tsconfigDir = path.dirname(tsconfigPath);

  parallel([
    function (check) {
      globalize(
        preparePaths(tsconfig.include, tsconfigDir),
        function (err, paths) {
          if (err) throw err;
          check(paths);
        }
      );
    },
    function (check) {
      globalize(
        preparePaths(tsconfig.exclude, tsconfigDir),
        function (err, paths) {
          if (err) throw err;
          check(paths);
        }
      );
    }
  ], function generate(result) {
    var includePaths = result[0];
    var excludePaths = result[1];

    var paths = includePaths.filter(function (p) {
      return excludePaths.indexOf(p) < 0
    });

    compile(paths, tsconfig.compilerOptions);
    callback();
  });
}

module.exports = dtsOnly;
