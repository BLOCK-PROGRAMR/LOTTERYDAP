import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import { abi } from "../../../block/artifacts/contracts/Lottery.sol/Lottery.json";

const contract_addr = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const contract_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owneraddr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_ownername",
                "type": "string"
            }
        ],
        "name": "WinnerPicked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "Owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Owneraddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "Participants",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ParticipantsIndex",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "Registration",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "_happened",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "checkBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contract_bal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "count",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
];

const Main = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [candiate, setCandiate] = useState("");
    const [winneraddr, setWinneraddr] = useState("");
    const [winnername, setWinnername] = useState("");
    const [contract_bal, setContract_bal] = useState("");
    const [reward, setReward] = useState("");
    const [owner, setOwner] = useState("");
    const [status, setStatus] = useState("");
    const [check, setcheck] = useState(true);
    const [Acc, setAcc] = useState("");

    const Metamaskconnection = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.log("Metamask is not installed, please install the Metamask extension.");
            return;
        }
        try {
            const Accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Address:", Accounts[0]);
            setAcc(Accounts[0]);

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contract_addr, abi, signer);
            setProvider(provider);
            setSigner(signer);
            setContract(contract);
            console.log("Metamask is connected!");
        } catch (err) {
            console.log("Error connecting Metamask:", err);
            setStatus(`metamask is established:${err.message}`);
        }
    };

    const registration = async () => {
        if (contract) {
            try {
                const etherValue = 2 * (Math.pow(10, 18));
                // const weiValue = ethers.utils.parseEther(etherValue.toString());
                console.log(etherValue.toString());
                const _reg = await contract.Registration(candiate, { value: etherValue.toString() });
                await _reg.wait();
                console.log("Registration is successful!");
            } catch (err) {
                console.log("Error while registration:", err);
                setStatus(`registration is failed:${err.message}`);
            }
        }
    };

    const PickWinner = async () => {
        if (contract) {
            try {
                setReward(contract_bal);
                const _pick = await contract.pickWinner();
                contract.on("WinnerPicked", (winnerAddress, winnerName) => {
                    setWinneraddr(winnerAddress.toString());
                    setWinnername(winnerName.toString());
                    console.log("please wait winner is picked!!");
                    console.log(`winner addr${winnerAddress}and name:${winnerName}`);
                });
                setcheck(false);
            } catch (err) {
                console.log("Error picking winner:", err);
                setStatus(`Pick winner failed due to${err.message}`);
            }
        }
    };

    const Balance = async () => {
        if (contract) {
            try {
                const _tx = await contract.contract_bal();
                const _tx2 = _tx / (BigInt(Math.pow(10, 18)));
                console.log("Balance of contract:", _tx.toString());
                console.log("Balance of the contract", _tx2.toString());
                setContract_bal(_tx2.toString());
            } catch (err) {
                console.log("Error getting contract balance:", err);
                setStatus(`Balance fn is failed:${err.message}`);
            }
        }
    };

    const checkOwner = async () => {
        if (contract) {
            try {
                const _tx = await contract.Owneraddr();
                console.log("owneradr:", _tx.toString());
                setOwner(_tx.toString());
            } catch (err) {
                console.log("err:", err);
                setStatus(`check owner is failed:${err.message}`);
            }
        }
    };
    // if (winneraddr != null && winneraddr != null) {
    //   return (
    //     <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
    //       <div className="absolute inset-0 flex justify-center items-center">
    //         <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-[400]">
    //           <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
    //           <p className="text-2xl font-semibold">Winner: {winnername}</p>
    //           <p className="text-xl">Address: {winneraddr}</p>
    //           <p className="text-xl">Reward: {reward} ETH</p>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }

    return (

        <div className="min-h-screen flex flex-col items-center justify-center  p-4 bg-gradient-to-r from-green-400 to-orange-400">

            {(winneraddr && winnername) ? (

                <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
                            <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-2xl font-semibold">Winner: {winnername}</p>
                            <p className="text-xl">Address: {winneraddr}</p>
                            <p className="text-xl">Reward: {reward} ETH</p>
                        </div>
                    </div>
                </div>)
                :
                <div className="w-full max-w-4xl p-8 rounded-lg  bg-white">
                    <h1 className="text-3xl font-bold mb-8 text-center">Lottery DAPP</h1>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">MetaMask Connection</h2>
                        <button onClick={Metamaskconnection} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Connect MetaMask
                        </button>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Registration</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={candiate}
                            onChange={(e) => setCandiate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button onClick={registration} className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                            Register
                        </button>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Pick Winner</h2>
                        <button onClick={PickWinner} className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
                            Pick Winner
                        </button>
                        <h1 className="capitalize mt-4 text-gray-700 underline">
                            <span className="text-red-700">Note:</span> If we pick the winner, wait for some time. The winner is declared by an algorithm and will be announced soon automatically.
                        </h1>
                        <h3 className="text-xl font-semibold mt-4">Winner details:</h3>
                        <p className="text-gray-700">Address: {winneraddr}</p>
                        <p className="text-gray-700">Name: {winnername}</p>
                        <p className="text-gray-700">Reward: {reward}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Contract Balance</h2>
                        <button onClick={Balance} className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-300">
                            Check Balance
                        </button>
                        <p className="text-gray-700 mt-2">Contract Balance: {contract_bal} ether (${contract_bal * 3469.58})</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Contract Owner</h2>
                        <button onClick={checkOwner} className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-300">
                            Check Owner
                        </button>
                        <p className="text-gray-700 mt-2">Owner Address: {owner}</p>
                    </section>
                </div>}
        </div>
    );
};

export default Main;
