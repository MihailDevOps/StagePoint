// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract SPFNft is ERC721URIStorage, Ownable {
  uint256 constant DECIMALS = 6; // Number of decimal places
  uint256 constant BASE = 10**DECIMALS; // Base value
  IERC20 public usdtToken = IERC20(0x9075770435462820c6a2857863bEd7d7F4fB548e);

  using SafeERC20 for IERC20;

  using Counters for Counters.Counter;
  address private contractOwner;

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;

  // All Token Ids in array
  uint256[] private _allNfts;

  mapping(string => bool) private _usedTokenURIs;
  mapping(uint => NFTItem) private _idToNftItem;

  mapping(address => mapping(uint => uint)) private _ownedTokens;
  mapping(uint => uint) private _idToOwnedIndex;

  mapping(uint => uint) private _idToNftIndex;

  enum RewardStatus {
    redy,
    claimed,
    waiting
  }

  struct Reward {
    uint date;
    uint amount;
    RewardStatus status;
  }

  struct NFTItem {
    uint tokenId;
    uint256 price;
    address creator;
    uint startDate;
    uint endDate;
    uint depositTerm;
    uint depositInterest;
    string interest;
    uint rewardsClaimed;
    uint payOff;
    uint rewardsAvailable;
    uint rewardProfit;
    // Reward[] rewards;
    bool isListed;
  }

  event NFTItemCreated (
    uint tokenId,
    uint price,
    address creator,
    uint startDate,
    uint endDate,
    uint depositTerm,
    uint depositInterest,
    string interest,
    uint rewardsClaimed,
    uint payOff,
    uint rewardsAvailable,
    uint rewardProfit
  );

  event ProfitClaimed (
    uint profit
  );

  event Deposit(address indexed _from, uint _value);

  event Withdrawal(address indexed _to, uint256 _value);

  event LogRes(uint result);

  uint public listingPrice = 0 ether;

  constructor() ERC721("StagePointNft", "SPFNFT") {
    contractOwner = msg.sender;
  }

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

  function getAllNfts() public view returns (NFTItem[] memory) {
    NFTItem[] memory items = new NFTItem[](_allNfts.length);

    for (uint i = 0; i < _allNfts.length; i++) {
      NFTItem storage item = _idToNftItem[_allNfts[i]];
      items[i] = item;
    }

    return items;
  }

  function Time_call() public view returns (uint256){
    return block.timestamp;
  }


  function burnToken(uint tokenId) public {
    _burn(tokenId);
  }

  function transferUSDT(address from, address _to, uint256 _amount) internal returns (bool) {
    return usdtToken.transferFrom(from, _to, _amount);
  }

  function mintToken(string memory tokenURI, uint256 price, uint startDate, uint endDate, uint depositTerm, uint depositInterest, string memory interest, uint payOff) public payable returns (uint) {
    require(keccak256(abi.encodePacked(interest)) == keccak256(abi.encodePacked("monthly")) || keccak256(abi.encodePacked(interest)) == keccak256(abi.encodePacked("compound")), "Invalid interest");
    // require(!tokenURIExists(tokenURI), "Token URI already exists");
    // require(msg.value == listingPrice, "Price must be qual to listing price");
    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price, startDate, endDate, depositTerm, depositInterest, interest, payOff);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }

  function approveDeposit (uint amount) public returns(bool) {
    return usdtToken.approve(msg.sender, amount);
  }

  function _createNftItem(uint tokenId, uint256 price, uint startDate, uint endDate, uint depositTerm, uint depositInterest, string memory interest, uint payOff) private {
    require(price > 100, "Price must be at least 100 USDT");

    uint256 initialAmount = price;
    uint256 annualInterestRate = (depositInterest * BASE) / 12 / 100;

    uint256 returnAmount;

    if (keccak256(abi.encodePacked(interest)) == keccak256(abi.encodePacked("monthly"))) {
      returnAmount = initialAmount * (1 + annualInterestRate) - initialAmount;
    } else {
      uint256 rate = BASE + annualInterestRate;
      uint256 finalAmount = 1;
      for (uint256 i = 0; i < depositTerm; i++){
        finalAmount *= rate;
        if (i > 1) {
          finalAmount = finalAmount / BASE;
        }
      }
      emit LogRes(finalAmount);
      // uint256 a = SafeMath.mul(initialAmount, ((1 + annualInterestRate) ** depositTerm));
      returnAmount = (initialAmount * finalAmount) - (initialAmount * (BASE ** 2));
      returnAmount = returnAmount/BASE;
      emit LogRes(returnAmount);
      // returnAmount = (initialAmount * ((((BASE + annualInterestRate)) / BASE) ** (depositTerm * BASE)));
      // uint b = (initialAmount * (BASE + annualInterestRate)) / BASE;
      // emit LogRes(b);
      // // uint p = (b ** (depositTerm * BASE)) / BASE;
      // // emit LogRes(p);
      // returnAmount = 0;
    }

    // require(returnAmount > 0, "Nft creation error");

    uint decimalsPrice = price * BASE;
    require(transferUSDT(msg.sender, address(this), decimalsPrice), "Tranaction error");


    _idToNftItem[tokenId] = NFTItem(
      tokenId,
      price,
      msg.sender,
      startDate,
      endDate,
      depositTerm,
      depositInterest,
      interest,
      0,
      payOff,
      1,
      returnAmount,
      true
    );

    emit NFTItemCreated(
      tokenId,
      price,
      msg.sender,
      startDate,
      endDate,
      depositTerm,
      depositInterest,
      interest,
      0,
      payOff,
      1,
      returnAmount / BASE
    );
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

  function deposit(uint amount) public payable {
    require(msg.sender == contractOwner, "Only owner can deposit founds");
    uint decimalsPrice = amount * BASE;
    transferUSDT(msg.sender, address(this), decimalsPrice);
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint256 _amount) public payable {
    require(msg.sender == contractOwner, "Only owner can withdraw founds");
    uint decimalsPrice = _amount * BASE;
    transferUSDT(address(this), msg.sender, decimalsPrice);
    emit Withdrawal(msg.sender, msg.value);
  }

  function claim(uint tokenId) public payable {
    NFTItem storage item = _idToNftItem[tokenId];
    require(item.creator == msg.sender, "You are not owner of this NFT");
    require(item.rewardsClaimed < item.depositTerm, "You calimed all reward");
    require(item.rewardsAvailable > 0, "No available rewards");

    require(transferUSDT(address(this), msg.sender, item.rewardProfit * item.rewardsAvailable), "Transaction error");

    _idToNftItem[tokenId].rewardsClaimed = item.rewardsClaimed + 1;
    _idToNftItem[tokenId].rewardsAvailable = 0;
  }

  function getUSDTBalance() public view returns (uint256) {
    return usdtToken.balanceOf(address(this)) / BASE;
  }
}