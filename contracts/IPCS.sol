// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IPCSTokens.sol";
import "./IPCSNFTInterface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IPCS{
    // instance for IPCS  Tokens
   IERC20 public ipcstoken;

    // instance for IPCSNFT Contract
    IIPCSNFT public iipcsnft;

    // defining owner
    address payable public owner;

    constructor(address _votingTokenAddress , address _nftcontractaddress){
        ipcstoken  = IERC20(_votingTokenAddress);
        iipcsnft = IIPCSNFT(_nftcontractaddress);
        owner  = payable(msg.sender);
    }

    // using counters for keep tracking of the tokenIds
    uint256 public  _proposalId = 0 ;

    // modifer that will allow to vote for only those people who hold ipcstoken
    modifier onlyTokenHolderWithAtLeast(uint256 amount) {
    require(ipcstoken.balanceOf(msg.sender) >= amount, "Not enough tokens to vote");
    _;
}

    modifier payToken(uint256 amount) {
    require(ipcstoken.allowance(msg.sender, address(this)) >= amount, "Allowance not set");
    ipcstoken.transferFrom(msg.sender, address(this), amount);
    _;
}

    // modifier 
    // struct for Proposals
    struct Proposal{
        uint256 proposalId;
        uint256 tokenId;
        string tokenURI;
        bool isStateisTrue;
        bool isproposed;
        bool proposalActive;
        uint256 yesvotes;
        uint256 novotes;
        bool executed;
        uint256 deadline;
        address owner;
        address[] voters;
        string storedatahash;
    }

    // tracking all proposals
    mapping(uint256 => Proposal) public proposals;

    // creating proposals
    function createProposal(uint256 _tokenid) public payable   returns(uint256){
        IIPCSNFT.NFTInfo  memory nftinfo = iipcsnft.getNFTInfobyId(_tokenid);

        require(nftinfo.isStateisTrue == false,"THE NFT State is Already  True");
        iipcsnft.setNFTisproposed(_tokenid);
        Proposal storage proposal = proposals[_proposalId];
        proposal.proposalId = _proposalId;
        proposal.deadline = block.timestamp + 10 hours;
        proposal.tokenId = nftinfo.tokenId;
        proposal.tokenURI = nftinfo.tokenURI;
        proposal.proposalActive = true ;
        proposal.executed = false;
        proposal.isproposed = true;
        proposal.owner = msg.sender;

        _proposalId++;

        return _proposalId - 1 ; // return the  proposalId of Proposal just created  

    }

    // checking if an address is in voters array or not
    function isInAddressArray(address[] memory addresses, address target) internal pure returns (bool) {
    for (uint256 i = 0; i < addresses.length; i++) {
        if (addresses[i] == target) {
            return false;
        }
    }
    return true;
}


    // voting on proposal
    function voteonProposal(uint256 proposalId, bool _vote) public  onlyTokenHolderWithAtLeast(10){

        Proposal storage proposal = proposals[proposalId];

        require(proposal.deadline > block.timestamp, "INACTIVE_PROPOSAL");
        // require(proposal.voters[msg.sender] == false, "ALREADY_VOTED");
        require(isInAddressArray(proposal.voters,  msg.sender), "Address not found in array");

        proposal.voters.push(msg.sender);

        if (_vote == true) {
            proposal.yesvotes += 1 ;
        } else {
            proposal.novotes += 1;
        }
    }


    // exceuting the proposal 
    function executeProposal(uint256 proposalId) public onlyTokenHolderWithAtLeast(10) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.deadline <= block.timestamp, "ACTIVE_PROPOSAL");
        require(proposal.executed == false, "ALREADY_EXECUTED");

        proposal.executed = true;
        
        if(proposal.yesvotes > proposal.novotes){
            proposal.isStateisTrue = true;
            proposal.executed = true;
            proposal.proposalActive = false;
            proposal.isproposed = true;
            iipcsnft.setNFTState(proposal.tokenId, true);


        }else{
             proposal.isStateisTrue = false;
            proposal.executed = true;
            proposal.proposalActive = false;
            proposal.isproposed = true;
            iipcsnft.setNFTState(proposal.tokenId, false);
        }   

    }

    // calling the set hash function , to set the hash we are getting from lighouse storage
    function setStoredDataHash(uint256 proposalId , string memory hash) public{
        Proposal storage proposal = proposals[proposalId];
        require(proposal.deadline <= block.timestamp, "ACTIVE_PROPOSAL");
        require(proposal.executed == false, "ALREADY_EXECUTED");
        proposal.storedatahash = hash;
    }

     function fetchMYProposals(address  _address) public view returns(Proposal[] memory){
        uint256 nftcount = _proposalId;
        uint256 currentIndex = 0;

        Proposal[] memory nfts = new Proposal[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(proposals[i+1].owner == payable(_address)){
                uint256 currrentId = i + 1 ;

                Proposal storage currentNFT = proposals[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            }
        }
        return nfts;
    }

      function fetchActiveProposals() public view returns(Proposal[] memory){
        uint256 nftcount = _proposalId;
        uint256 currentIndex = 0;

        Proposal[] memory nfts = new Proposal[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(proposals[i+1].proposalActive == true){
                uint256 currrentId = i + 1 ;
                Proposal storage currentNFT = proposals[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            }
           
            
        }
        return nfts;
    }

    function fetchSuccesfullProposals() public view returns(Proposal[] memory){
        uint256 nftcount = _proposalId;
        uint256 currentIndex = 0;

        Proposal[] memory nfts = new Proposal[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(proposals[i+1].isStateisTrue == true){
                uint256 currrentId = i + 1 ;
                Proposal storage currentNFT = proposals[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            }
           
            
        }
        return nfts;
    }

    
    function fetchUnSuccesfullProposals() public view returns(Proposal[] memory){
        uint256 nftcount = _proposalId;
        uint256 currentIndex = 0;

        Proposal[] memory nfts = new Proposal[](nftcount);

        for(uint256  i = 0 ; i < nftcount ; i++){
            if(proposals[i+1].isStateisTrue == false){
                uint256 currrentId = i + 1 ;
                Proposal storage currentNFT = proposals[currrentId];
                nfts[currentIndex] = currentNFT;
                currentIndex += 1 ;
            }
            
        }
        return nfts;
    }


    function getproposalInfobyId(uint256 id_) public  view returns(Proposal memory){
        return proposals[id_];
    }




   

    //if user want to fund smart contract 
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
    }

    // Receive and fallback function
    receive() external payable {}

    fallback() external payable {}


}