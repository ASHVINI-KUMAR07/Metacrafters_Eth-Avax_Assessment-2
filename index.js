import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [concAddress, setConcAddress] = useState();
  const [owner, setOwner] = useState();
  const [bal, setBal] = useState();
  const [val, setVal] = useState();
  const [redBal, setRedBal] = useState();

  const contractAddress = "0x38d2bf1DC1A5689aD29E2fA8337B270f5Fc6822c";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const increaseBal = async () => {
    if (atm) {
      const res = await atm.increaseBalance(parseInt(val));
    }
  };
  const reduceFunc = async()=> { 
    if(atm){ 
      const val = await atm.decrease(parseInt(redBal));
    }
  };
  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const getAddress = async () => {
    if (atm) {
      const contractAddress = await atm.getAddres();
      setConcAddress(contractAddress);
    }
  };

  const getOwner = async () => {
    if (atm) {
      const owner = await atm.viewOwner();
      setOwner(owner);
    }
  };

  const showBalance = async () => {
    if (atm) {
      const bal = await atm.showBalance();
      setBal(bal.toNumber());
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <div>
          <p>Your Account: {account[0]}</p>
          <p>Your Balance: {balance}</p>
          <button onClick={deposit}>Deposit 1 ETH</button>
          <button onClick={withdraw}>Withdraw 1 ETH</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>You're at the Metacrafters ATM(Your trusted financial partner!)</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          body {
            height: 100vh;
            background-color: pink;
          }
          .container {
            text-align: center;
            border: 10px solid black;
            background-color: #ffe5b4;
          }
          button {
            background-color: #ffcccb;
            padding: 10px 20px;
            border-radius: 10px;
            margin: 15px;
          }
        `}
      </style>

      <div>
        <button onClick={getAddress}>View Address</button>
      </div>

      <div>
        <button onClick={getOwner}>Display Owner's Address</button>
      </div>

      <lable>Set the Amount you want to reduce</lable>
      <input
        placeholder="Type in the Amount"
        onChange={(e) => setRedBal(e.target.value)}
      />
      <button onClick={reduceFunc}>Submit</button>
      

      <div>
        <button onClick={showBalance}>Show Contract Balance</button>
      </div>

      <lable>Enter the Amount you want to increment</lable>
      <input
        placeholder="Type in the Amount"
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={increaseBal}>Submit</button>

      <p>{concAddress}</p>
      <p>{owner}</p>
      <p>{bal}</p>
    </main>
  );
}