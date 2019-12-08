const sha256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
	constructor(fromAddress , toAddress , amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}

	calculateHash() {
		return sha256(this.fromAddress + this.toAddress + this.amount).toString();
	}

	signTransaction(signingKey) {
		if(signingKey.getPublic('hex') !== fromAddress)
			throw new Error("Transaction can't be performed using different wallet.");

		const hashTrans = this.calculateHash();
		const sign = signingKey.sign(hashTrans , 'base64');
		this.signature = sign.toDER('hex'); //Export DER encoded signature in array
	}

	isValid() {
		if(this.fromAddress === null) 
			return true;
		if(!this.signature || this.signature.length === 0)
			throw new Error('No signature in this transaction');
		
		const publicKey = ec.keyFromPublic(this.fromAddress);
		publicKey.verify(this.calculateHash() , this.signature);
			
	}
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
		return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.terminate).toString();
	}
	
	miningBlock(difficulty) {
		while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0'))
		{
			this.hash = this.calculateHash();
			this.terminate++;
		}
		console.log("HASH: " + this.hash + "\n");
	}
}

class Blockchain { 
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	//Genesis block is the first block
	createGenesisBlock() { 
		return new Block( "25/01/2019" , "Genesis Block" , "0");
	}

	getLatestBlock() { 
		return this.chain[this.chain.length - 1];

	}

	/*
	Basic Block 
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.miningBlock(this.difficulty);
		this.chain.push(newBlock);
	}
	*/

	miningPendingTransactions(miningRewardAddress)
	{
		console.log((this.pendingTransactions));
 		let block = new Block(Date.now() , this.pendingTransactions);
		block.miningBlock(this.difficulty);
		
		console.log("Block Mined Successfully");
		this.chain.push(block);
		
		//At every stage , the prending transaction list is reset.
		this.pendingTransactions = [
			new Transaction(null , miningRewardAddress , this.miningReward)
		];
	}

	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address) {
		let balance = 0;

		for(const block of this.chain)
		{
			for(const trans of block.transactions)
			{
				if(trans.fromAddress === address)
					balance -= trans.amount;
				if(trans.toAddress == address)
					balance += trans.amount;
			}
		}

		return balance;
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
