[![npm](https://img.shields.io/npm/v/start-tape.svg?style=flat-square)](https://www.npmjs.com/package/start-tape)
[![travis](http://img.shields.io/travis/start-runner/tape.svg?style=flat-square)](https://travis-ci.org/start-runner/tape)
[![deps](https://img.shields.io/gemnasium/start-runner/tape.svg?style=flat-square)](https://gemnasium.com/start-runner/tape)

tape task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-tape
```

## Usage

Task is rely on array of files.

```js
// tasks/index.js
import Start from 'start';
import logger from 'start-simple-logger';
import files from 'start-files';
import watch from 'start-watch';
import tape from 'start-tape';
import spec from 'tap-spec';

const start = Start(logger());

export function test() {
    return start(
        files('test/**/*.js'),
        tape(spec)
    );
}

export function tdd() {
    return start(
        files([ 'lib/**/*.js', 'test/**/*.js']),
        watch(test)
    );
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "test": "npm run task test",
  "tdd": "npm run task tdd"
}
```

## Arguments

`tape(reporter)`

* `reporter` – [tape reporter](https://github.com/substack/tape#pretty-reporters), raw TAP by default
