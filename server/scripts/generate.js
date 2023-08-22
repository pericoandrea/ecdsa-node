const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("private key:", toHex(privateKey));

const publicKey1 = secp256k1.getPublicKey(privateKey, false);
console.log("public key1:", toHex(publicKey1));
const publicKey2 = secp256k1.getPublicKey(privateKey);
console.log("public key2:", toHex(publicKey2));

const address1 =  keccak256(publicKey1.slice(1)).slice(-20);
const address2 =  keccak256(publicKey2.slice(1)).slice(-20);
console.log('address1:', toHex(address1));
console.log('address2:', toHex(address2));

const messageHash = keccak256(utf8ToBytes(JSON.stringify({
        greeting: "Hola mundo"
    })));

const signature = secp256k1.sign(messageHash, privateKey);

const isSigned1 = secp256k1.verify(signature, messageHash, publicKey1);
console.log("sign1:", isSigned1);

const isSigned2 = secp256k1.verify(signature, messageHash, hexToBytes("032205b9ff7aece0d3914bb8289ba11ed41b7b95d9ec5c44e7f0537c1a8f83c04e"));
console.log("sign2:", isSigned2);