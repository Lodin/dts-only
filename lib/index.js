#!/usr/bin/env node
var minimist = require('minimist');
var tsc = require('typescript');
var program = require('./dts-only');
var packageJson = require('../package');

var helpMessage = [
'  Usage: dts-only [options] <...files>',
'',
'  Options:',
'',
'    -c, --compiler          Prints current compiler version.',
'    -h, --help              Prints this message.',
'        --outDir DIRECTORY  Redirect output structure to the directory.',
'    -p, --project TSCONFIG  Project\'s "tsconfig.json" (default: tsconfig.json).',
'    -v, --version           Prints package version.'
];

function run() {
  var options = minimist(process.argv.slice(2), {
    alias: {
      c: 'compiler',
      h: 'help',
      p: 'project',
      v: 'version'
    },
    default: {
      project: 'tsconfig.json'
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

  program(options);
  console.log('dts-only: declaration files generated.');
}

run();
