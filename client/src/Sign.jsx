import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Sign({ msg, show, setShow, setBalance }) {
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  function hashMessage(message) {
    const bytes = utf8ToBytes(JSON.stringify(message));
    return keccak256(bytes);
  }

  function signMessage(hashMessage) {
    const signature = secp256k1.sign(hashMessage, privateKey);
    console.log(signature);
    const replacer = (key, value) => typeof value === "bigint" ? value.toString() : value;
    return JSON.stringify(signature,replacer);
  }
  
  async function sign(evt) {
    evt.preventDefault();
    try {
      const hashMsg = hashMessage(msg);
      const signature = signMessage(hashMsg);
      const {
        data: { balance },
      } = await server.post(`send`, {
        msg,
        signature
      });
      setBalance(balance);
      alert("Transfer was successful!");
    } catch (ex) {
      console.log(ex);
      alert(ex.message);
    } finally {
      setPrivateKey("");
      setShow(false);
    }
  }

  if(!show){
    return null;
  }
  return (
    <form className="container transfer" onSubmit={sign}>
      <h1>Sign Transaction</h1>

      <label>
        Write your privateKey
        <input
          placeholder="1, 2, 3..."
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Sign" />
    </form>
  );
}

export default Sign;
