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
* `--outDir` - specifies directory for typescript compiler output
* `-p`, `--project` - path to `tsconfig.json` file.
* `-v`, `--version` - prints package version
 