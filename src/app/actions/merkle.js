import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils.js";
import { whitelistAddress } from "../constants/contract-constants.js";

const leafnodes = whitelistAddress.map((x) => {
  return keccak256(x);
});

const tree = new MerkleTree(leafnodes, keccak256, { sort: true });

const rootHash = tree.getHexRoot();

export const getRootHash = () => {
  return rootHash;
};

export const getProof = (address) => {
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);
  return proof;
}