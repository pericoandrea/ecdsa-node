const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "027c5d3c36ce5f8e59029a2efd9686f4a6914f047a48718c860790999e58a36357": 200,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


/* Get the signature from the client-side application
   and verify the transaction from the signature
*/
app.post("/send", (req, res) => {
  
  const { sender, recipient, amount } = req.body.msg;
  
  const signature = reviverBingInt(req.body.signature);
  
  const isSigned =secp256k1.verify(signature, hashMessage(req.body.msg), sender);

  if (!isSigned) {
    res.status(400).send({ message: "Invalid transaction!" });
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function reviverBingInt(payload) {
  const reviver = (key, value) => (typeof value === "string" ? BigInt(value) : value);
  return JSON.parse(payload, reviver);
}

function hashMessage(message) {
  const bytes = utf8ToBytes(JSON.stringify(message));
  return keccak256(bytes);
}