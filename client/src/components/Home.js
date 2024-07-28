import React, { useState } from "react";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();

    const checkMetamask = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.log("Metamask is not installed, please install the Metamask extension.");
            setCheck(false);
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Address:", accounts[0]);

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setCheck(true);
            navigate("/home/main");
            console.log("Metamask is connected!");
        } catch (err) {
            console.log("Error connecting Metamask:", err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gradient-to-r from-green-400 to-orange-500 min-h-screen">
            <div className="md:w-1/2 flex flex-col justify-center md:mr-8 p-6  ">
                <h1 className="text-red-600 font-bold mt-6 text-4xl md:text-5xl animate-pulse">
                    Welcome to the Web3 World
                </h1>
                <h2 className="mt-4 text-gray-800 text-lg">
                    This website mainly focuses on a Lottery Voting System in a decentralized manner.
                </h2>
                <div className="mt-4">
                    <h3 className="font-bold text-lg text-gray-700">Rules to know for participating in the Lottery System:</h3>
                    <ul className="list-disc ml-5 mt-2 text-gray-600">
                        <li>We can participate by paying two ethers to the contract.</li>
                        <li>If participating members are more than three, then we can draw the lottery; otherwise not.</li>
                        <li>After drawing the lottery, one participant is selected based on some algorithm, and all the ethers are directly sent to the winner's account address.</li>
                        <li>For participating, your account must have a minimum of 2 ethers.</li>
                        <li>This is one of the applications of DeFi.</li>
                    </ul>
                </div>
                <p className="mt-4 text-gray-700">
                    Discover the latest in blockchain technology, smart contracts, and decentralized applications. Join us in exploring the decentralized future!
                </p>
                <button
                    onClick={checkMetamask}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                    Connect Metamask
                </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:ml-8 mt-8 md:mt-0">
                <img
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN29nMnQ3NWl0eDJkNHRnbWh1NmRqNm5rNWwyeGltYWh1Ymh4ZHJwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KmZug7QLdDz4wO54Vc/giphy.webp"
                    alt="Web3 GIF"
                    className="max-w-full mt-[60] transform hover:scale-105 transition duration-300"
                />
            </div>
        </div>
    );
};

export default Home;
