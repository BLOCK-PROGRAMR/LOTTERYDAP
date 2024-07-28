// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public Owner;
    uint public count;

    constructor() {
        Owner = msg.sender;
    }

    mapping(address => string) public Participants;
    mapping(uint => address) public ParticipantsIndex;
    bool public _happened = false;
    modifier onlyOwner() {
        require(msg.sender == Owner, "you are not a owner");
        _;
    }
    event WinnerPicked(address indexed _owneraddr, string _ownername);

    function Registration(string memory _name) public payable {
        require(
            msg.value == 2 ether,
            "we can pay the 2 ether for particiapting the Lottery"
        );
        require(
            bytes(Participants[msg.sender]).length == 0,
            "already registered"
        );
        Participants[msg.sender] = _name;
        ParticipantsIndex[count++] = msg.sender;
    }

    function pickWinner()
        public
        payable
        onlyOwner
        returns (address, string memory)
    {
        require(count >= 3, "There must be three participants");
        require(!_happened, "lottery already happened");
        uint randomeIndex = uint(
            keccak256(
                abi.encodePacked(block.chainid, msg.sender, block.timestamp)
            )
        ) % count;
        string memory Winnername = Participants[
            ParticipantsIndex[randomeIndex]
        ];
        address Winneraddr = ParticipantsIndex[randomeIndex];
        payable(Winneraddr).transfer(address(this).balance);
        emit WinnerPicked(Winneraddr, Winnername);
        _happened = true;
        return (Winneraddr, Winnername);
    }

    function contract_bal() public view returns (uint) {
        return address(this).balance;
    }

    function Owneraddr() public view returns (address) {
        return Owner;
    }

    function checkBalance(address _addr) public view returns (uint) {
        return _addr.balance;
    }
}
