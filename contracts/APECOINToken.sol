// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract APECOINTOKENS is ERC20 {

     constructor() ERC20("APECOIN", "APE"){
    }

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }

    
    receive() external payable {}

    fallback() external payable {}

}
