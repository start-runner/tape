# start-tape

[![npm](https://img.shields.io/npm/v/start-tape.svg?style=flat-square)](https://www.npmjs.com/package/start-tape)
[![linux build](https://img.shields.io/travis/start-runner/tape.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/tape)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/tape.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/tape)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/tape.svg?style=flat-square)](https://codecov.io/github/start-runner/tape)
[![deps](https://img.shields.io/gemnasium/start-runner/tape.svg?style=flat-square)](https://gemnasium.com/start-runner/tape)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-00d06f.svg?style=flat-square)](https://gitter.im/start-runner/start)

[Tape](https://github.com/substack/tape/) task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-tape
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import watch from 'start-watch';
import tape from 'start-tape';
import spec from 'tap-spec';

const start = Start(reporter());

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

This task relies on array of files, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`tape(reporter)`

* `reporter` – [tape reporter](https://github.com/substack/tape#pretty-reporters), raw TAP by default
