# dts-only
Command-line utility built on top of typescript compiler to generate only declaration files.
Originally built to work with [@babel/plugin-transform-typescript](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-typescript),
because it does not support generating declarations. 

**Note:** Alpha version! Do not use in production.

## Installation
```bash
$ npm install dts-only
```

## Command-line options
* `-c`, `--compiler` - prints current compiler version
* `-h`, `--help` - prints usage information
* `-m`, `--module` - specifies module resolution for typescript compiler:
  * `none`,
  * `commonjs`,
  * `amd`,
  * `system`,
  * `umd`,
  * `es2015` (default),
  * `esnext`
* `--outDir` - specifies directory for typescript compiler output
* `-p`, `--project` - path to `tsconfig.json` file.
* `-t`, `--target` - specifies ECMAScript version for typescript compiler:
  * `es3`,
  * `es5`,
  * `es2015` (default),
  * `es2016`,
  * `es2017`, 
  * `esnext`
* `-v`, `--version` - prints package version
 