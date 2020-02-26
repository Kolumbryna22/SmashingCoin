const SHA256 = require('crypto-js/sha256');

class CryptoBlock {
  constructor (data) {
    this.index = data.index;
    this.timestamp = data.timestamp;
    this.data = data.data;
    this.precedingHash = (data && data.precedingHash) || ' ';
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash () {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork (difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain {
  constructor () {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
  }

  startGenesisBlock () {
    return new CryptoBlock({
      index: 0,
      timestamp: '01/01/2020',
      data: 'Initial Block in the Chain',
      precedingHash: '0'
    });
  }

  obtainLatestBlock () {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock (newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity () {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.precedingHash !== precedingBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const currentTime = new Date();
let smashingCoin = new CryptoBlockchain();

smashingCoin.addNewBlock(new CryptoBlock({
  index: 1,
  timestamp: '01/06/2020',
  data: {
    sender: 'Iris Ljesnjanin',
    recipient: 'Cosima Mielke',
    quantity: 50
  }
}));

smashingCoin.addNewBlock(new CryptoBlock({
  index: 2,
  timestamp: '01/07/2020',
  data: {
    sender: 'Vitaly Friedman',
    recipient: 'Ricardo Gimenes',
    quantity: 100
  }
}));

const workingTime = new Date();
const delta = workingTime.getTime() - currentTime.getTime();

console.log(JSON.stringify(smashingCoin, null, 4));
console.log(delta / 1000);
