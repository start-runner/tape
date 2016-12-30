export default (reporter) => (input) => {
  return function tape(/* log */) {
    const test = require('tape');
    const through = require('through');
    const requireUncached = require('require-uncached');

    return new Promise((resolve, reject) => {
      const stream = test.createStream();
      const results = test.getHarness()._results;

      if (typeof reporter === 'function') {
        stream.pipe(reporter()).pipe(process.stdout);
      } else {
        stream.pipe(process.stdout);
      }

      results.once('done', function() {
        this._stream.queue(`\n1..${this.count}\n`);
        this._stream.queue(`# tests ${this.count}\n`);
        this._stream.queue(`# pass  ${this.pass}`);

        if (this.fail > 0) {
          this._stream.queue(`# fail  ${this.fail}\n`);
        } else {
          this._stream.queue('\n# ok\n');
        }

        this._stream.once('end', () => {
          if (this.fail > 0) {
            reject();
          } else {
            resolve();
          }

          this.count = 0;
          this.fail = 0;
          this.pass = 0;
          this.tests = [];
          this._stream = through();
        });
        this._stream.queue(null);
      });

      input.forEach(requireUncached);
    });
  };
};
