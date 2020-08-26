const { Suite } = require('benchmark');
const suite = new Suite('commify', { minTime: 10000 });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const num = 123456789012345678;

suite
  .add('regex', () => {
    numberWithCommas(num);
  })
  .add('toLocaleString', () => {
    num.toLocaleString();
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
