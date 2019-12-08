const {Blockchain , Transaction} = require('./blockchain');

let firstTry = new Blockchain();
firstTry.createTransaction(new Transaction('address1' , 'address2' , 100));
firstTry.createTransaction(new Transaction('address2' , 'address1' , 60));

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1: " + firstTry.getBalanceOfAddress('rewardAddr1') + " points reward\n");

firstTry.miningPendingTransactions('rewardAddr2');
console.log("rewardAddr2: " + firstTry.getBalanceOfAddress('rewardAddr2') + " points reward\n");

firstTry.createTransaction(new Transaction('address1' , 'address2' , 150));
firstTry.createTransaction(new Transaction('address2' , 'address1' , 30));

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1 " + firstTry.getBalanceOfAddress('rewardAddr1') + " points reward\n");

firstTry.miningPendingTransactions('rewardAddr1');
console.log("rewardAddr1 " + firstTry.getBalanceOfAddress('rewardAddr1') + " points reward\n");

firstTry.miningPendingTransactions('rewardAddr2');
console.log("Addr2 " + firstTry.getBalanceOfAddress('rewardAddr2') + " points reward\n");


console.log(JSON.stringify(firstTry  , null , 4));
