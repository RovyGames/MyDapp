/* eslint-disable no-undef */
require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "d42f306ceab64ed6ac835fdee25797e1";

const GOERLI_PRIVATE_KEY = "ad433137da5306756876f7a2a990044ff86dded90f48bca0fd1c194ce0277984";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};