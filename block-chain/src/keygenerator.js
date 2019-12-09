const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const fs = require('fs');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

let keyObject = {
	"publicKey" : publicKey , 
	"privateKey" : privateKey	
	
};

let jsonObject = JSON.stringify(keyObject);
fs.writeFile('keyGen.json', jsonObject, (err)=>{
	if(err) throw err;
});

//module.exports = keyObject;

