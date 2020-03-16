const CryptoBlock = require('./CryptoBlock');

module.exports = class CryptoBlockchain {
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

  addNewBlock (data) {
    const newBlock = new CryptoBlock(data);

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
