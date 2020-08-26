const { Suite } = require('benchmark');
const suite = new Suite('bcrypt', { minTime: 10000 });

const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const encrypted = '0t/cgozJsdSi6gIAl2tvcw==';

const base64key = '7pHuWRvz+0LcLNzfXCyT6A==';
const cryptoJsKey = CryptoJS.enc.Base64.parse(base64key)
const nativeKey = Buffer.from(base64key, 'base64')

const iv = 'KPAYWtest2WpTest';
const plainText = 'hanjukim';

const cryptoJsCipher = () => 
  CryptoJS.lib.SerializableCipher.encrypt(
    CryptoJS.algo.SEED,
    CryptoJS.enc.Utf8.parse(plainText),
    cryptoJsKey,
    { iv: CryptoJS.enc.Utf8.parse(iv) }
  ).toString();

const cryptoJsDecipher = () =>
  CryptoJS.lib.SerializableCipher.decrypt(
    CryptoJS.algo.SEED,
    encrypted,
    cryptoJsKey,
    { iv: CryptoJS.enc.Utf8.parse(iv) }
  ).toString();

const nativeCipher = () => {
  const cipher = crypto.createCipheriv('seed', nativeKey, iv);
  cipher.update(plainText);
  return cipher.final('base64').toString()
}

const nativeDecipher = () => {
  const decipher = crypto.createDecipheriv('seed', nativeKey, iv);
  decipher.update(encrypted, 'base64');
  return decipher.final('hex').toString()
}

console.log(cryptoJsCipher())
console.log(nativeCipher())
console.log(cryptoJsDecipher())
console.log(nativeDecipher())

suite
  .add('CryptoJs SEED cipher', cryptoJsCipher)
  .add('CryptoJs SEED decipher', cryptoJsDecipher)
  .add('native cipher', nativeCipher)
  .add('native decipher', nativeDecipher)
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
