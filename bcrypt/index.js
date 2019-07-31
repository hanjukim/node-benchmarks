const bcrypt = require('bcrypt');
const { Suite } = require('benchmark');
const suite = new Suite('bcrypt', { minTime: 10000 });

const myPlaintextPassword = '101010';

suite
  .add('salt round 10', () => {
    bcrypt.hashSync(myPlaintextPassword, 10);
  })
  .add('salt round 11', () => {
    bcrypt.hashSync(myPlaintextPassword, 11);
  })
  .add('salt round 12', () => {
    bcrypt.hashSync(myPlaintextPassword, 12);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
