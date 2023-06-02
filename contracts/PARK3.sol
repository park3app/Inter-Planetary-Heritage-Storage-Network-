//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PARK3 is ERC721URIStorage  {
    // using counters for keep tracking of the tokenIds
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;

    // defining owner 
    address  public owner;

    uint256 public listPrice = 0.001 ether;

    constructor(string memory name , string memory symbol) ERC721(name, symbol) {
        owner = msg.sender;
    }

    //defining nftinfo struct
    struct NFTInfo{
        uint256 tokenId;
        string tokenURI;
        address payable owner;
        uint256 costToBuild;
        uint256 insurancePrice;
        string location;
        bool wantsInsurance;
        uint256 VotesInFavour;
        uint256 VotesInAgainst;
        bool isStateisTrue;
        string description;
        string culturalSignificance;
        string  name ;
    }



     //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => NFTInfo) public idToListedNFT;

    // mapping address of user --> to list of tokenIds
    mapping(address => uint256[]) public addressTotokenIds;

    // create an nft function 
    function createToken(string memory tokenURI, uint256 _costToBuild, uint256 _insurancePrice,  string memory _location, bool _isStateisTrue,
        string memory _description,
        string memory _culturalSignificance, string memory _name ) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedNFT(newTokenId,tokenURI,_costToBuild,_insurancePrice,_location,_isStateisTrue,_description,_culturalSignificance,_name);
                        
        return newTokenId;
        }


        // createListedNft function
        function createListedNFT(uint256 _tokenId , string memory _tokenURI, uint256 _costToBuild,uint256 _insurancePrice,
        string memory _location,bool _isStateisTrue,string memory _description, string memory _culturalSignificance, string memory _name
        ) public  {
            // require(msg.value == listPrice, "Hopefully sending the correct price");
            idToListedNFT[_tokenId] = NFTInfo(
                _tokenId,
                _tokenURI,
                payable (msg.sender),
                _costToBuild,
                _insurancePrice,
                _location,
                false,
                0,
                0,
                _isStateisTrue,
                _description,
                _culturalSignificance,
                _name
            );

            addressTotokenIds[msg.sender].push(_tokenId);

        }

    // getting nft data for a particular address
    function fetchMYNFTs() public view returns(NFTInfo[] memory){
        uint256 nftcount = _tokenIds.current();
        uint256 currentIndex = 0;

        NFTInfo[] memory nfts = new NFTInfo[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(idToListedNFT[i+1].owner == payable(msg.sender)){
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

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }




}