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

            results.once('done', function () {
                if (this.fail === 0) {
                    resolve();
                } else {
                    reject();
                }

                this.count = 0;
                this.fail = 0;
                this.pass = 0;
                this.tests = [];
                this._stream = through();
            });

            input.forEach(requireUncached);
        });
    };
};
