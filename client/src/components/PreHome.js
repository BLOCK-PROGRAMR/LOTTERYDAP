import React from "react";
import { Link } from "react-router-dom";

const PreHome = () => {
    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-orange-500 hover:to-green-500">
            <div className="flex flex-col items-center text-center p-5 bg-opacity-50 bg-white rounded-lg shadow-xl">
                <img
                    src="https://blockchain.cse.iitk.ac.in/img/bg-img/mission.png"
                    alt="Cover Image"
                    className="w-60 mt-10 rounded-lg shadow-lg"
                />
                <div className="mt-5">
                    <h1 className="text-5xl font-bold text-black font-serif mb-4">
                        Welcome to the Web3 World
                    </h1>
                    <p className="text-xl text-gray-800 mb-6">
                        Experience the next generation of the internet with blockchain technology. Decentralized, secure, and transparent.
                    </p>
                    <p className="text-lg text-gray-700">
                        Explore our platform to discover how Web3 is transforming industries and creating new opportunities.
                    </p>
                </div>
            </div>
            <Link to="/home">
                <button className="absolute bottom-10 right-10 bg-red-800 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-600 transition duration-300">
                    Next Page
                </button>
            </Link>
        </div>
    );
};

export default PreHome;
