//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract IPCSNFT is ERC721URIStorage  {
    // using counters for keep tracking of the tokenIds
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;

    // defining owner 
    address  payable public  owner;

    uint256 public listPrice = 0.01 ether;

    constructor(string memory name , string memory symbol) ERC721(name, symbol) {
        owner = payable(msg.sender);
    }

    //defining nftinfo struct
    struct NFTInfo{
        uint256 tokenId;
        string tokenURI;
        address payable owner;
        bool  _isStateisTrue;
        bool isproposed;
        string storeddatahash;
    }

     //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => NFTInfo) public idToListedNFT;

    // mapping address of user --> to list of tokenIds
    mapping(address => uint256[]) public addressTotokenIds;

    // create an nft function 
    function createToken(string memory tokenURI,  bool _isStateisTrue, bool _isproposed) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedNFT(newTokenId,tokenURI,_isStateisTrue , _isproposed);
                        
        return newTokenId;
        }


        // createListedNft function
        function createListedNFT(uint256 _tokenId , string memory _tokenURI,  bool _isStateisTrue , bool _isproposed ) payable public  {
            require(msg.value == listPrice, "Hopefully sending the correct price");
            idToListedNFT[_tokenId] = NFTInfo(
                _tokenId,
                _tokenURI,
                payable (msg.sender),
                _isStateisTrue,
                _isproposed,
                ''
            );

            addressTotokenIds[msg.sender].push(_tokenId);

        }

    // getting nft data for a particular address
    function fetchMYNFTs(address  _address) public view returns(NFTInfo[] memory){
        uint256 nftcount = _tokenIds.current();
        uint256 currentIndex = 0;

        NFTInfo[] memory nfts = new NFTInfo[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(idToListedNFT[i+1].owner == payable(_address)){
                uint256 currrentId = i + 1 ;

                NFTInfo storage currentNFT = idToListedNFT[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            }
        }
        return nfts;
    }

    // fetch all NFTS
     // getting nft data for a particular address
    function fetchALLNFTs() public view returns(NFTInfo[] memory){
        uint256 nftcount = _tokenIds.current();
        uint256 currentIndex = 0;

        NFTInfo[] memory nfts = new NFTInfo[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
                uint256 currrentId = i + 1 ;
                NFTInfo storage currentNFT = idToListedNFT[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            
        }
        return nfts;
    }


    // ------------     Simple Functions 
       function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getCurrentTokenID() public view returns (uint256) {
        return _tokenIds.current();
    }

    /// interface Contract 
    function getNFTInfobyId(uint256 id_) public  view returns(NFTInfo memory){
        return idToListedNFT[id_];
    }


    function setNFTState(uint256 tokenId, bool newState) public   {
    require(_exists(tokenId), "NFT does not exist");
    idToListedNFT[tokenId]._isStateisTrue = newState;
}

    function setNFTisproposed(uint256 _id) public{
        idToListedNFT[_id].isproposed = true;
    }


    function getNFTHash(uint256 tokenId , string memory _hash) public {
        require(_exists(tokenId), "NFT does not exist");
        idToListedNFT[tokenId].storeddatahash = _hash;
    }

    receive() external payable {}

    fallback() external payable {}


    function withdraw() payable public {
        require(payable(msg.sender) == owner,'You are not owner of contract');
        (bool success,) = owner.call{value:msg.value}("");

        require(success,"Trabsfer Failed");
    }


}