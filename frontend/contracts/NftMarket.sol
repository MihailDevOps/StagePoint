// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftMarket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;

  // All Token Ids in array
  uint256[] private _allNfts;

  mapping(string => bool) private _usedTokenURIs;
  mapping(uint => NFTItem) private _idToNftItem;

  mapping(address => mapping(uint => uint)) private _ownedTokens;
  mapping(uint => uint) private _idToOwnedIndex;

  mapping(uint => uint) private _idToNftIndex;

  struct NFTItem {
    uint tokenId;
    uint price;
    address creator;
    bool isListed;
  }

  event NFTItemCreated (
    uint tokenId,
    uint price,
    address creator,
    bool isListed
  );

  uint public listingPrice = 0.025 ether;

  constructor() ERC721("CreaturesNFT", "CNFT") {}

  function setListingPrice(uint newPrice) external onlyOwner {
    require(newPrice > 0, "Price must be at least 1 wei");
    listingPrice = newPrice;
  } 

  function getNftItem(uint tokenId) public view returns (NFTItem memory) {
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }

  function totalSupply() public view returns (uint) {
    return _allNfts.length;
  }

  function tokenByIndex(uint index) public view returns (uint) {
    require(index < totalSupply(), "Index out of bounds");
    return _allNfts[index];
  }

  function tokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
    require(index < ERC721.balanceOf(owner), "Index out of bounds");
    return _ownedTokens[owner][index];
  }

  function getOwnedNfts() public view returns (NFTItem[] memory) {
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    NFTItem[] memory items = new NFTItem[](ownedItemsCount);

    for (uint i = 0; i < ownedItemsCount; i++) {
      uint tokeId = tokenOfOwnerByIndex(msg.sender, i);
      NFTItem storage item = _idToNftItem[tokeId];
      items[i] = item;
    }

    return items;
  }


  function burnToken(uint tokenId) public {
    _burn(tokenId);
  }

  function mintToken(string memory tokenURI, uint price) public payable returns (uint) {
    // require(!tokenURIExists(tokenURI), "Token URI already exists");
    // require(msg.value == listingPrice, "Price must be qual to listing price");
    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }


  function _createNftItem(uint tokenId, uint price) private {
    require(price > 0, "Price must be at least 1wei");

    _idToNftItem[tokenId] = NFTItem(
      tokenId,
      price,
      msg.sender,
      true
    );

    emit NFTItemCreated(tokenId, price, msg.sender, true);
  }

  function _beforeTokenTransfer(address from, address to, uint tokenId, uint256 batchSize) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);

    if (from == address(0)) {
      _addTokenToAllTokensEnumeration(tokenId);
    } else if (from != to) {
      _removeTokenFromOwnerEnumeration(from, tokenId);
    }

    if (to == address(0)) {
      _removeTokenFromAllTokensEnumeration((tokenId));
    } else if (to != from) {
      _addTokenToOwnerEnumeration(to, tokenId);
    }
  }

  function _addTokenToAllTokensEnumeration(uint tokenId) private {
    _idToNftIndex[tokenId] = _allNfts.length;
    _allNfts.push(tokenId);
  }

  function _addTokenToOwnerEnumeration(address to, uint tokenId) private {
    uint lenght = ERC721.balanceOf(to);
    _ownedTokens[to][lenght] = tokenId;
    _idToOwnedIndex[tokenId] = lenght;
  }

  function _removeTokenFromOwnerEnumeration(address from, uint tokenId) private {
    uint lastTokenIndex = ERC721.balanceOf(from) - 1;
    uint tokenIndex = _idToOwnedIndex[tokenId];

    if (tokenIndex != lastTokenIndex) {
      uint lastTokenId = _ownedTokens[from][lastTokenIndex];
      _ownedTokens[from][tokenId] = lastTokenId;
      _idToOwnedIndex[lastTokenId] = tokenIndex;
    }

    delete _idToOwnedIndex[tokenId];
    delete _ownedTokens[from][lastTokenIndex];
  }

  function _removeTokenFromAllTokensEnumeration(uint tokenId) private {
    uint lastTokenIndex = _allNfts.length - 1;
    uint tokenIndex = _idToNftIndex[tokenId];
    uint lastTokenId = _allNfts[lastTokenIndex];

    _allNfts[tokenIndex] = lastTokenId;
    _idToNftIndex[lastTokenId] = tokenIndex;

    delete _idToNftIndex[tokenId];
    _allNfts.pop();
  }
}