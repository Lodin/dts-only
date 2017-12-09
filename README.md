# dts-only
[![Latest Stable Version](https://img.shields.io/npm/v/dts-only.svg)](https://www.npmjs.com/package/dts-only)
[![License](https://img.shields.io/npm/l/dts-only.svg)](./LICENSE)
[![Build Status](https://img.shields.io/travis/Lodin/dts-only/master.svg)](https://travis-ci.org/Lodin/dts-only)
[![Test Coverage](https://img.shields.io/codecov/c/github/Lodin/dts-only/master.svg)](https://codecov.io/gh/Lodin/dts-only)

Command-line utility built on top of typescript compiler to generate only declaration files.
Originally built to work with [@babel/plugin-transform-typescript](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-typescript),
because it does not support generating declarations. 

**Note:** Alpha version! Do not use in production.

## Installation
```bash
$ npm install dts-only
```

## Usage
Just run script in command line:
```bash
$ dts-only
```
Script will try to find `tsconfig.json` at your cwd. If you have configuration in another directory,
specify it with `-p`:
```bash
$ dts-only -p src/tsconfig.json
```

## Command-line options
* `-c`, `--compiler` - prints current compiler version
* `-h`, `--help` - prints usage information
* `--outDir` - specifies directory for typescript compiler output
* `-p`, `--project` - path to `tsconfig.json` file.
* `-v`, `--version` - prints package version
 