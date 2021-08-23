pragma solidity ^0.5.0;

import "../lib/IERC1155.sol";

contract Marketplace{
    IERC1155 private _token;

    //map a tokenID to price
    mapping(uint256 => uint256) price;

     constructor(IERC1155 token) public {
        // must have a valid address...
        require(address(token) != address(0));
        _token = token;
        //price in wei thats 1 Quintillion 1^18 or 1,000,000,000,000,000,000
        price[1] = 100000000000000; // 0.0001 ETH
        price[2] = 200000000000000; // 0.0002 ETH
        price[3] = 300000000000000; // 0.0003 ETH
    }

    function() external payable{
        buyToken(1);
    }

    function buyToken(uint256 tokenId) public payable{
        //get the amout sent
        uint256 weiAmount = msg.value;

        //ensure they send enough 
        require(weiAmount >= price[tokenId] && price[tokenId] != 0);

        _token.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
    }
}