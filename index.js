const CryptoBlockchain = require('./CryptoBlockchain');

const currentTime = new Date();
let smashingCoin = new CryptoBlockchain();

smashingCoin.addNewBlock({
  index: 1,
  timestamp: '01/06/2020',
  data: {
    sender: 'Iris Ljesnjanin',
    recipient: 'Cosima Mielke',
    quantity: 50
  }
});

smashingCoin.addNewBlock({
  index: 2,
  timestamp: '01/07/2020',
  data: {
    sender: 'Vitaly Friedman',
    recipient: 'Ricardo Gimenes',
    quantity: 100
  }
});

const workingTime = new Date();
const delta = workingTime.getTime() - currentTime.getTime();

console.log(JSON.stringify(smashingCoin, null, 4));
console.log(delta / 1000);
