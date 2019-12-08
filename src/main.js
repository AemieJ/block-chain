const sha256 = require('crypto-js/sha256');

class Transaction {
	
}

class Block {
	constructor(timestamp , transactions , previousHash = '') {
		this.timestamp = timestamp;
		this.transactions  = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.terminate = 0;
	}

	calculateHash() {
		return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.terminate).toString();
	}
	
	miningBlock(difficulty) {
		while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0'))
		{
			this.hash = this.calculateHash();
			this.terminate++;
		}
		console.log("HASH: " + this.hash);
	}
}

class Blockchain { 
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
	}

	//Genesis block is the first block
	createGenesisBlock() { 
		return new Block( "25/01/2019" , "Genesis Block" , "0");
	}

	getLatestBlock() { 
		return this.chain[this.chain.length - 1];

	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.miningBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid() {
		for(let i = 1; i < this.chain.length;i++) 
		{
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			
			if(currentBlock.hash !== currentBlock.calculateHash()){	return false; }
			if(currentBlock.previousHash !== previousBlock.hash){ return false; }
		}
		return true;
	}
}

let firstTry = new Blockchain();

//console.log(JSON.stringify(firstTry  , null , 4));

