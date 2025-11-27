// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RandomColor {
    string[] private colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange"
    ];

    function getRandomColor() external view returns (string memory) {
        // VERY simple pseudo-randomness using timestamp + sender
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender)
            )
        );

        uint256 index = randomNumber % colors.length;
        return colors[index];
    }

    function getColorsCount() external view returns (uint256) {
        return colors.length;
    }
}
