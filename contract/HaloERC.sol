// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Halo is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Address for address payable;

    uint256 public constant mintPrice = 0.001 ether;
    uint256 public constant maxMintSupply = 100;
    uint256 public constant refundPeriod = 10 minutes; // Time limit for refunds

    mapping(uint256 => uint256) public refundEndTimestamps; // Refund deadline for each token
    mapping(uint256 => bool) public hasRefunded; // Tracks if a token was refunded
    uint256 private latestRefundDeadline;

    event NFTMinted(address indexed minter, uint256 tokenId);
    event NFTRefunded(
        address indexed refunder,
        uint256 tokenId,
        uint256 refundAmount
    );

    constructor() Ownable(msg.sender) ERC721("HALO", "$HAL") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeicyheumtconolj4c6jdlmuh5efyppqzl34vy7iok3mpelbc2ajqeu/";
    }

    /// @notice Mint a specific NFT if it's available.
    function mint(uint256 tokenId) external payable {
        require(msg.value >= mintPrice, "Not enough ETH sent");
        require(totalSupply() < maxMintSupply, "Max supply reached");
        require(_ownerOf(tokenId) == address(0), "Token already minted");

        _safeMint(msg.sender, tokenId);
        refundEndTimestamps[tokenId] = block.timestamp + refundPeriod;

        // ✅ Track the latest refund timestamp
        if (refundEndTimestamps[tokenId] > latestRefundDeadline) {
            latestRefundDeadline = refundEndTimestamps[tokenId];
        }

        emit NFTMinted(msg.sender, tokenId);
    }

    function refund(uint256 tokenId) external nonReentrant {
        require(hasRefunded[tokenId] == false, "Token already refunded");
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(
            block.timestamp < refundEndTimestamps[tokenId],
            "Refund period expired"
        );

        uint256 refundAmount = (mintPrice * 95) / 100; // 95% refund (5% fee)
        hasRefunded[tokenId] = true;

        _transfer(msg.sender, address(this), tokenId);
        payable(msg.sender).sendValue(refundAmount);

        emit NFTRefunded(msg.sender, tokenId, refundAmount);
    }

    /// @notice Withdraw contract balance after refund period ends.
    function withdraw() external onlyOwner {
        require(
            block.timestamp > getLatestRefundDeadline(),
            "Refund period not over"
        );

        uint256 balance = address(this).balance;
        payable(owner()).sendValue(balance);
    }

    /// @notice Returns the latest refund deadline among all tokens.
    function getLatestRefundDeadline() public view returns (uint256) {
        return latestRefundDeadline;
    }

    function isTokenMinted(uint256 tokenId) public view returns (bool) {
        // ✅ Use try-catch to handle the revert case when token is not minted
        try this.ownerOf(tokenId) returns (address) {
            return true; // Token exists and is already minted
        } catch {
            return false; // Token does not exist, meaning it's not minted
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }
}
