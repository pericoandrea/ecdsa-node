const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = hexToBytes("1047cd231d661546fe6ac7ce8ec9514d2d0657130208b1f947538041b21041e7"); //secp256k1.utils.randomPrivateKey();
console.log("private key:", toHex(privateKey));

const publicKey1 = secp256k1.getPublicKey(privateKey, false);
console.log("public key1:", toHex(publicKey1));
const publicKey2 = secp256k1.getPublicKey(privateKey);
console.log("public key2:", toHex(publicKey2));

const address1 =  keccak256(publicKey1.slice(1)).slice(-20);
const address2 =  keccak256(publicKey2.slice(1)).slice(-20);
console.log('address1:', toHex(address1));
console.log('address2:', toHex(address2));