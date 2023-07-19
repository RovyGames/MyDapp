// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HappyPika is ERC721, ERC721Enumerable, Pausable, Ownable {

    // Namespaces

    using Strings for uint256;
    using Counters for Counters.Counter;

    // Contract variables

    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.005 ether;
    uint256 public MAX_SUPPLY = 400;
    uint256 public MAX_PER_WALLET = 2;

    mapping(address => bool) public whitelist;

    bool public isPublicSale = false;

    // Constructor and URI declaration

    constructor() ERC721("HappyPika", "HPK") {
        _tokenIdCounter.increment(); // Token id starts from 1
        pause();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeibh75isfe5sdby2xha57cnke3dyubmhp2m6yq2hmc6ogr63w4yp5e/";
    }

    // Utilities

    function setCost(uint256 newPrice) public onlyOwner {
        MINT_PRICE = newPrice * 1 ether;
    }

    function getCost() public view returns (uint256) {
        return MINT_PRICE;
    }

    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        MAX_SUPPLY = newMaxSupply;
    }

    function getMaxSupply() public view returns (uint256) {
        return MAX_SUPPLY;
    }

    function setMaxPerWallet(uint256 newMaxPerWallet) public onlyOwner {
        MAX_PER_WALLET = newMaxPerWallet;
    }

    function getMaxPerWallet() public view returns (uint256) {
        return MAX_PER_WALLET;
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is zero.");
        payable(owner()).transfer(address(this).balance);
    }

    // Whitelist logic

    function addToWhitelist(address[] calldata toAddAddresses) external onlyOwner {
        for (uint i = 0; i < toAddAddresses.length; i++) {
            whitelist[toAddAddresses[i]] = true;
        }
    }

    function removeFromWhitelist(address[] calldata toRemoveAddresses) external onlyOwner {
        for (uint i = 0; i < toRemoveAddresses.length; i++) {
            delete whitelist[toRemoveAddresses[i]];
        }
    }

    function togglePublicSale() public onlyOwner {
        isPublicSale = !isPublicSale;
    }

    // Pause logic

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Minting functions

    function safeMint(address to, uint amount) public payable whenNotPaused {
        if (!isPublicSale)
        {
            require(whitelist[to], "Address is not in whitelist.");
        }

        require(totalSupply() < MAX_SUPPLY, "Can't mint anymore NFTs.");
        require(balanceOf(to) + amount <= MAX_PER_WALLET, "Maximum amount of NFTs per wallet reached.");
        require(msg.value >= MINT_PRICE * amount, "Not enough ether in balance.");

        for (uint i = 0; i < amount; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
        }
    }

    // Contract base functions

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function tokenURI(uint256 tokenId) public view virtual  override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}