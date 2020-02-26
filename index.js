const SHA256 = require('crypto-js/sha256');

class CryptoBlock {
  constructor (data) {
    this.index = data.index;
    this.timestamp = data.timestamp;
    this.data = data.data;
    this.precidingHash = data.precidingHash;
    this.hash = this.computeHash();
  }

  computeHash () {
    return SHA256(
      this.index +
        this.precidingHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class CryptoBlockchain {
  constructor () {
    this.blockchain = [this.startGenesisBlock()];
  }

  startGenesisBlock () {
    return new CryptoBlock({
      index: 0,
      timestamp: "01/01/2020",
      data: "Initial Block in the Chain",
      precidingHash: "0"
    });
  }

  obtainLatestBlock () {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock (newBlock) {
    newBlock.precidingHash = this.obtainLatestBlock.hash;
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }
}

let smashingCoin = new CryptoBlockchain();

smashingCoin.addNewBlock(new CryptoBlock({
  index: 1,
  timestamp: "01/06/2020",
  data: {
    sender: "Iris Ljesnjanin",
    recipient: "Cosima Mielke",
    quantity: 50
  }
}));

smashingCoin.addNewBlock(new CryptoBlock({
  index: 2,
  timestamp: "01/07/2020",
  data: {
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100
  }
}));

console.log(JSON.stringify(smashingCoin, null, 4));
