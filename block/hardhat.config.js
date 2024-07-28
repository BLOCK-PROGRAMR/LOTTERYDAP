require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: ["contracts/Lottery.sol"],
  networks: {
    // sepolia:{
    //   url:process.env.INFURA_PROJECT_ID,
    //   accounts:[process.env.PRIVATE_KEY]
    // }
  }
};
