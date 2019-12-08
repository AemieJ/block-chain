## BlockChain Basics 

Blockchain is a chain of blocks by its definition , however it comes with a security hash function . Each user in a block has a public key and a private key . With the help of security checks , the integrity of the blockchain is maintained by checking the validity of each block in the chain. 

## Proof of Work 

In the blockchain , it is possible that the user could spam with hundreds of blocks and there might be cases when the user changes the hash function of each and every block just to allow its faulty transaction as well as maintain the validity of chain . For preventing this from happening , proof of work comes into action. 

Proof of work is a mechanisim to let the blockchain know the fact that a lot of computational power has been put in to create the particular block . This is also known as mining. In proof of work , to prevent spamming of blocks or faulty transactions or copy of hashes , we add a difficulty in such a way that each block takes time to generate the new hash value and this is done by adding zeros in the beginning of the hash value. 

In the calculate Hash function , you include a terminate value to change the value of Hash to include the zeros in the beginning of the hash function till the difficulty mentioned.

```
   calculateHash(index , timestamp , data , previousHash) 
	return sha256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.date) + this.terminate).toString();
	
```

The terminate value will control the while loop without it , the hash function doesn't change and mining of the block will enter an endless loop.

```
   while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join('0') 
   {
	this.hash = this.calculateHash();
	this.terminate++;
   }
```

## Mining Rewards and Transactions 

In the cases of cryptocurrencies , there needs to be transacations to take places and virtual money to be present in the system . Hence mining rewards are introduced so as to keep the digitalized money within the system as well.
