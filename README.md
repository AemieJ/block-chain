## BlockChain Basics 

Blockchain is a chain of blocks by its definition , however it comes with a security hash function . Each user in a block has a public key and a private key . With the help of security checks , the integrity of the blockchain is maintained by checking the validity of each block in the chain. 

## Proof of Work 

In the blockchain , it is possible that the user could spam with hundreds of blocks and there might be cases when the user changes the hash function of each and every block just to allow its faulty transaction as well as maintain the validity of chain. For preventing this from happening , proof of work comes into action.

Proof of work is a mechanisim to let the blockchain know the fact that a lot of computational power has been put in to create the particular block . This is also known as mining. In proof of work , to prevent spamming of blocks or faulty
transactions or copy of hashes , we add a difficulty in such a way that each block takes time to generate the new hash value and this is achieved by adding zeros in the beginning of the hash string. 

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
Mining rewards are provided when you mine a block successfully. When a hash function is being produced with security , it makes sure that it takes about some time(10 minutes in case of BitCoin) to compute hash for each block. Within this time all the transactions that take place are kept in the pending transactions and after the computation is completed for a block , the transaction then takes place.

We replace the addBlock() method with a miningPendingTransaction(miningRewardAddress) method because in reality , miners choose a particular block to mine in a block chain so when the miners mine a block successfully , the miningReward is provided to them to the miningRewardAddress and the block that was mined (with proof of work) is now added to the chain of all blocks. After each mining of block is done and added to the block-chain , the pendingTransactions are reset to null for the new blocks that would be added (every 10 minutes in the case of BitCoin).

In transactions, for calculating the balance you've to iterate through every single block to check which blocks contains your address and calculate the amount on the basis of that.
When a miner chooses a particular block to mine , it is rewarded and that is recorded within the pending transactions hence , the reward is then received in the next block mining in the block-chain. Also at every stage a miner does its job of mining the block , then the pending transaction list is cleared.

For the following input structure: 
```
let firstTry = new Blockchain();
firstTry.createTransaction(new Transaction('address1' , 'address2' , 100));
firstTry.createTransaction(new Transaction('address2' , 'address1' , 60));

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1: " + firstTry.getBalanceOfAddress('rewardAddr1') + "points reward\n");

firstTry.miningPendingTransactions('rewardAddr2');
console.log("rewardAddr2: " + firstTry.getBalanceOfAddress('rewardAddr2') + "points reward\n");

firstTry.createTransaction(new Transaction('address1' , 'address2' , 150));
firstTry.createTransaction(new Transaction('address2' , 'address1' , 30));

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1 " + firstTry.getBalanceOfAddress('rewardAddr1') + "points reward\n");

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1 " + firstTry.getBalanceOfAddress('rewardAddr1') + "points reward\n");

firstTry.miningPendingTransactions('rewardAddr2');
console.log("Addr2 " + firstTry.getBalanceOfAddress('rewardAddr2') + "points reward\n");

```

The output structure is as follows , the list in between are the pending transaction at every stage and the hash that is produced by mining the block by the miner: 

```
[
  Transaction {
    fromAddress: 'address1',
    toAddress: 'address2',
    amount: 100
  },
  Transaction {
    fromAddress: 'address2',
    toAddress: 'address1',
    amount: 60
  }
]
HASH: 0023ec58dc0a05082a46cae7f773750a2eebbfbd1d951f98d6c819bc66ad67b7

Block Mined Successfully
rewardAddr1: 0 points reward

[
  Transaction {
    fromAddress: null,
    toAddress: 'rewardAddr1',
    amount: 100
  }
]
HASH: 001b07a66dbb4737ccc79d551790e97987a43d1f926c9b6ce27065a0cf30bbfd

Block Mined Successfully
rewardAddr2: 0 points reward

[
  Transaction {
    fromAddress: null,
    toAddress: 'rewardAddr2',
    amount: 100
  },
  Transaction {
    fromAddress: 'address1',
    toAddress: 'address2',
    amount: 150
  },
  Transaction {
    fromAddress: 'address2',
    toAddress: 'address1',
    amount: 30
  }
]
HASH: 005bcb76dc0f9a26f49c66332b1ecafc5eb32de5baffbeba8c4488f93bba74ba

Block Mined Successfully
rewardAddr1 100 points reward

[
  Transaction {
    fromAddress: null,
    toAddress: 'rewardAddr1',
    amount: 100
  }
]
HASH: 000a00d6a8c9dd887fcb8eb45dbada1e9578f43f7c3c305497901e9920281e34

Block Mined Successfully
rewardAddr1 200 points reward

[
  Transaction {
    fromAddress: null,
    toAddress: 'rewardAddr1',
    amount: 100
  }
]
HASH: 0091d425ee32bdc9b9b1abd24a5fed02d0dc2531d5683c97816878d10f7eef39

Block Mined Successfully
Addr2 100 points reward
```

The final object including the transactions and mining rewards has the following structure: 

```
{
    "chain": [
        {
            "timestamp": "25/01/2019",
            "transactions": "Genesis Block",
            "previousHash": "0",
            "hash": "05a95a3d3ee32634d6520c22e6bd9bf43001b94b736c094b2efd9265a66c5735",
            "terminate": 0
        },
        {
            "timestamp": 1575807913963,
            "transactions": [
                {
                    "fromAddress": "address1",
                    "toAddress": "address2",
                    "amount": 100
                },
                {
                    "fromAddress": "address2",
                    "toAddress": "address1",
                    "amount": 60
                }
            ],
            "previousHash": "",
            "hash": "00f42a5b1636e06a84b5f55046629a4ac05ba4f4713b4bc43e826b24d7c9eab4",
            "terminate": 347
        },
        {
            "timestamp": 1575807913983,
            "transactions": [
                {
                    "fromAddress": null,
                    "toAddress": "rewardAddr1",
                    "amount": 100
                }
            ],
            "previousHash": "",
            "hash": "00574c36a904f5b1760c93c6e32386ea2c32aef32e1fe9214d9bfd67c8de0b5f",
            "terminate": 18
        },
        {
            "timestamp": 1575807913983,
            "transactions": [
                {
                    "fromAddress": null,
                    "toAddress": "rewardAddr2",
                    "amount": 100
                },
                {
                    "fromAddress": "address1",
                    "toAddress": "address2",
                    "amount": 150
                },
                {
                    "fromAddress": "address2",
                    "toAddress": "address1",
                    "amount": 30
                }
            ],
            "previousHash": "",
            "hash": "00f14f69adebab63d065dcc1b8c4f199cb6b90d3f733d53a861c9b87bcabd4ab",
            "terminate": 841
        },
        {
            "timestamp": 1575807914000,
            "transactions": [
                {
                    "fromAddress": null,
                    "toAddress": "rewardAddr1",
                    "amount": 100
                }
            ],
            "previousHash": "",
            "hash": "0095248d1f6491648a481cca90e2ca6ce17c337c9c9c68c4f68855b96b966fed",
            "terminate": 163
        },
        {
            "timestamp": 1575807914003,
            "transactions": [
                {
                    "fromAddress": null,
                    "toAddress": "rewardAddr1",
                    "amount": 100
                }
            ],
            "previousHash": "",
            "hash": "00668c2358e0df4669d0a9fd5d7d3b68842f3232dd6dafac070c3f6af40a4ed0",
            "terminate": 932
        }
    ],
    "difficulty": 2,
    "pendingTransactions": [
        {
            "fromAddress": null,
            "toAddress": "rewardAddr2",
            "amount": 100
        }
    ],
    "miningReward": 100
}
```
The fromAddress and toAddress will be replaced by the public Key that will be generated for each individual.

## Signing Transactions

Without any signing transactions , it is possible for any individual to spend any coin even the ones that doesn't belong to them. Hence , we provide a signature and make use of the public and the private key so that every transaction comes with a signature making transactions effective. 

We generate the private key and public key using a known basic algorithm and for signing the transaction , we sign the hash of our transaction with our private key.However in the case of mining rewards, the miners don't have any signature however this transaction is consider a valid case.
