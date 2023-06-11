pragma solidity ^0.8.0;


interface IIPCSNFT {
    struct NFTInfo {
        uint256 tokenId;
        string tokenURI;
        address payable owner;
        bool isStateisTrue;
        bool isproposed;
    }

    function createToken(string calldata tokenURI, bool _isStateisTrue, bool _isproposed) external payable returns (uint);
    function createListedNFT(uint256 _tokenId, string calldata _tokenURI, bool _isStateisTrue, bool _isproposed) external;
    function fetchMYNFTs(address _address) external view returns (NFTInfo[] memory);
    function fetchALLNFTs() external view returns (NFTInfo[] memory);
    function updateListPrice(uint256 _listPrice) external payable;
    function getListPrice() external view returns (uint256);
    function getCurrentTokenID() external view returns (uint256);
    function getNFTInfobyId(uint256 id_) external view returns (NFTInfo memory);
    function setNFTState(uint256 tokenId, bool newState) external;
    function getNFTHash(uint256 tokenId , string calldata _hash) external;
    function setNFTisproposed(uint256 _id) external;
}
