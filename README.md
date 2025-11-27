# 🎨 RandomColor — On-Chain Pseudo-Random Color Generator

## 📌 Project Description  
RandomColor is a beginner-friendly Solidity smart contract that generates a random color **directly on-chain**.  
It uses a simple pseudo-random mechanism based on the current block timestamp and the caller’s address to return a color from a predefined list.

This project is ideal for:  
- Students learning smart contracts  
- Hackathon workshops  
- Demonstrations of blockchain → frontend interactions  
- Anyone exploring on-chain randomness (non-secure by design)  

It is intentionally minimal, easy to understand, and perfect for first-time builders learning Web3 fundamentals.

---

## 🎯 What It Does  
When a user calls the *getRandomColor()* function:

1. The contract creates a pseudo-random number.  
2. It maps the number to an index in the internal color list.  
3. It returns one color such as *"red"*, *"blue"*, *"yellow"*, *"orange"*, etc.  

It also exposes a helper function *getColorsCount()* that returns how many colors exist in the array.  
No constructor arguments, no configuration, no parameters — just deploy and call.

---

## ⭐ Features  
- On-chain pseudo-random color generation  
- Zero deployment parameters  
- Beginner-friendly code structure  
- Lightweight, gas-efficient view functions  
- Great for workshops, demos, and simple UI integrations  
- Easy to extend (add more colors, expose array, build UI, etc.)  

---

## 🔗 Deployed Smart Contract  
**Transaction:**  
https://coston2-explorer.flare.network/tx/0x793ac018ccd1c3be9c3243ce68f8ff17b99afaccaabde4c1e2032e5545e460ec?tab=index

---

## 📄 Smart Contract Code (Solidity)

//paste your code  
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

---

## 📂 Repository Structure (Placeholder)
.
├── contracts/  
│   └── RandomColor.sol   (main contract)  
├── scripts/  
│   └── XXX  
├── frontend/  
│   └── XXX  
└── README.md  

---

## 🙌 Credits  
Created as part of hands-on Web3 experimentation and exploration with Solidity.  
Feel free to fork, extend, or integrate this into your own dApps!  

