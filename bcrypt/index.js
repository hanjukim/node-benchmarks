const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const { Suite } = require('benchmark');
const suite = new Suite('bcrypt', { minTime: 30000 });

const myPlaintextPassword = '101010';
let h;

suite
  .add('hash round 1', () => {
    bcrypt.hashSync(myPlaintextPassword, 1);
  })
  .add('hash round 3', () => {
    bcrypt.hashSync(myPlaintextPassword, 3);
  })
  .add('hash round 5', () => {
    bcrypt.hashSync(myPlaintextPassword, 5);
  })
  .add('hash round 10', () => {
    bcrypt.hashSync(myPlaintextPassword, 10);
  })
  .add('hash round 11', () => {
    bcrypt.hashSync(myPlaintextPassword, 11);
  })
  .add('hash round 12', () => {
    bcrypt.hashSync(myPlaintextPassword, 12);
  })
  .add('js hash round 10', () => {
    h = bcryptjs.hashSync(myPlaintextPassword, 10);
  })
  .add('compare', () => {
    if (!bcrypt.compareSync(myPlaintextPassword, h)) {
      console.log('wtf');
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
