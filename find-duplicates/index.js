const { Suite } = require('benchmark');
const suite = new Suite('find duplicate element in array', { minTime: 10000 });
const uuid = require('uuid')

const uuids = [];

for (let i = 0; i < 1000; ++i) {
  uuids.push(uuid());
}

suite
  .add('vanilla', () => {
    for (let i = 0; i < uuids.length; i += 1) {
      if (uuids.indexOf(uuids[i]) !== i) {
        console.error('has duplicate!');
      }
    }
  })
  .add('set', () => {
    const set = new Set(uuids);

    if (Array.from(set).length !== uuids.length) {
      console.error('has duplicate!');
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
