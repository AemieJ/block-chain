const {Blockchain , Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const privateKey = require('./keyGen.json').privateKey;

const myKey = ec.keyFromPrivate(privateKey);
const myWalletAddress = myKey.getPublic('hex');

let firstTry = new Blockchain();
const tx1 = new Transaction(myWalletAddress , 'addr2' , 10);
tx1.signTransaction(myKey);
firstTry.addTransaction(tx1);

console.log('Miner inititated\n');
firstTry.miningPendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress , 'addr1' , 30);
tx2.signTransaction(myKey);
firstTry.addTransaction(tx2);

firstTry.miningPendingTransactions(myWalletAddress);


console.log('Balance\n');
console.log(firstTry.getBalanceOfAddress(myWalletAddress));


//console.log(JSON.stringify(firstTry  , null , 4));
