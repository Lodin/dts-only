#!/usr/bin/env node
var minimist = require('minimist');
var tsc = require('typescript');
var program = require('./dts-only');
var packageJson = require('./package');

var helpMessage = [
'  Usage: dts-only [options]',
'',
'  Options:',
'',
'    -c, --compiler          Prints current compiler version.',
'    -h, --help              Prints this message.',
'    -m, --module KIND       Specify module code generation: "none", "commonjs", "amd", "system", "umd", "es2015" (default), or "esnext".',
'        --outDir DIRECTORY  Redirect output structure to the directory.',
'    -p, --project TSCONFIG  Project\'s "tsconfig.json" (default: tsconfig.json).',
'    -t, --target VERSION    Specify ECMAScript target version: "es3", "es5", "es2015" (default), "es2016", "es2017", or "esnext".',
'    -v, --version           Prints package version.'
];

function run() {
  var options = minimist(process.argv.slice(2), {
    alias: {
      c: 'compiler',
      h: 'help',
      m: 'module',
      p: 'project',
      t: 'target',
      v: 'version'
    },
    default: {
      module: 'es2015',
      project: 'tsconfig.json',
      target: 'es2015'
    },
    boolean: ['compiler', 'help', 'version'],
    string: ['module', 'outDir', 'project', 'target']
  });

  if (options.help) {
    console.log(helpMessage);
    return
  }

  if (options.version) {
    console.log(packageJson.version);
    return;
  }

  if (options.compiler) {
    console.log(tsc.version);
    return;
  }

  program(options, function finish() {
    console.log('Declaration files generated.');
  });
}

run();
