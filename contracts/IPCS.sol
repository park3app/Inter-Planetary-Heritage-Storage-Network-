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
    address payable public  owner;

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
        mapping(address => bool) voters;
    }

    // tracking all proposals
    mapping(uint256 => Proposal) public proposals;

    // creating proposals
    function createProposal(uint256 _tokenid) public payable  payToken(1) returns(uint256){
        IIPCSNFT.NFTInfo  memory nftinfo = iipcsnft.getNFTInfobyId(_tokenid);

        require(nftinfo.isStateisTrue == false,"THE NFT State is Already  True");

        Proposal storage proposal = proposals[_proposalId];
        proposal.proposalId = _proposalId;
        proposal.deadline = block.timestamp + 15 minutes;
        proposal.tokenId = nftinfo.tokenId;
        proposal.tokenURI = nftinfo.tokenURI;
        proposal.proposalActive = true ;
        proposal.executed = false;
        proposal.isproposed = true;

        _proposalId++;

        return _proposalId - 1 ; // return the  proposalId of Proposal just created  

    }

    // voting on proposal
    function voteonProposal(uint256 proposalId, bool _vote) public  onlyTokenHolderWithAtLeast(10){

        Proposal storage proposal = proposals[proposalId];

        require(proposal.deadline > block.timestamp, "INACTIVE_PROPOSAL");
        require(proposal.voters[msg.sender] == false, "ALREADY_VOTED");

        proposal.voters[msg.sender] = true;

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

    // if user want to fund smart contract 
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
    }


  



    // Receive and fallback function
    receive() external payable {}

    fallback() external payable {}


}