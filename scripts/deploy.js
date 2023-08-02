/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { URI } from "../src/app/constants/contract-constants.js";
import { getRootHash } from "../src/app/actions/merkle.js";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const root = getRootHash();

  const HappyPika = await hre.ethers.getContractFactory("HappyPika");
  const happyPika = await HappyPika.deploy(root, URI);

  await happyPika.deployed();

  console.log("HappyPika deployed to:", happyPika.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
