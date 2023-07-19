import { ethers } from "ethers";
import HappyPika from "../src/artifacts/contracts/HappyPika.sol/HappyPika.json";

const CONTRACT_ADDRESS = "0x9Fd81a47C8c99736CC479ab368501f25C7b01526";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  HappyPika.abi,
  provider.getSigner()
);

const addressess = ["0xfD0172e4CFaD1d71B711c54158Fa53adA0a22fc0"];

const addToWhitelist = async () => {
  const tx = await contract.addToWhitelist(addressess);
  await tx.wait();
  console.log("Added to whitelist");
};

await addToWhitelist();