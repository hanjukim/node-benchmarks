const crypto = require('crypto');
const { Suite } = require('benchmark');
const suite = new Suite('pbkdf2', { minTime: 30000 });

const plainPassword = '101010';
let h;

const pbkdf2 = (r) => {
  const salt = crypto.randomBytes(64).toString('base64');
  return crypto.pbkdf2Sync(plainPassword, salt, r, 64, 'sha512');
}

suite
  .add('pbkdf2 1000', () => {
    pbkdf2(1000);
  })
  .add('pbkdf2 5000', () => {
    pbkdf2(5000);
  })
  .add('pbkdf2 10000', () => {
    pbkdf2(10000);
  })
  .add('pbkdf2 50000', () => {
    pbkdf2(50000);
  })
  .add('pbkdf2 100000', () => {
    pbkdf2(100000);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
