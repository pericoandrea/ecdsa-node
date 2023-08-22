import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer 
        
        address={address}
        setMsg={setMsg}
        setShow={setShow}
      />
      <Sign msg={msg} show={show} setShow={setShow} setBalance={setBalance}/>
    </div>
    
  );
}

export default App;
