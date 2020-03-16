const SHA256 = require('crypto-js/sha256');

module.exports = class CryptoBlock {
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
