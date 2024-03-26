// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ganache {
    
    address public owner;

    address public smartContract;

    string message="";

    event newContract(address owner, address smartContract);

    event newMessage(string message);

    constructor(){
        owner = msg.sender;
        smartContract = address(this);
        emit newContract(owner, smartContract);
    }

    function setMessage(string memory _message) public {
        message = _message;
        emit newMessage(message);
    }

    function getMessage() public view returns (string memory){
        return message;
    }
}