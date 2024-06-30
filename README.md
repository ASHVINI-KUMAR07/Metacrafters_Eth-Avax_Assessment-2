# You're at the Metacrafters ATM(Your trusted financial partner!)

This is the name of my Metacrafter ATM

## Objective

1. To implement or make a smart contract with almost 3 functions
2. To display different values of functions in frontend part of application.
   To make a smart contract with 2-3 functions
<img width="596" alt="meta" src="https://github.com/ASHVINI-KUMAR07/meta_3.2/assets/149240098/7c46b451-4275-4c4f-a192-072ce297830b">

# Description 
After cloning the github, you will want to do the following to get the code running on your computer.
1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
Typically at http://localhost:3000/

# Getting Started
The code we are running on the online Solidity IDE that is https://remix.ethereum.org/ here we'll perform the code. as we are on the remix website just by clicking on th start coding we will be able to do coding in Solidity.

## Implementation
Here, i implemented many functions in frontend along with values of state variables.
1. To display Account Address.
2. To display Owner Address.
3. Showing Contract Balance.
4. Increasing the balance by entering the certain amount.
5. And also decreasing the balance by entering the certain amount.
6. attached is the screenshot for the same. Refer it
   <img width="605" alt="metaaaa" src="https://github.com/ASHVINI-KUMAR07/meta_3.2/assets/149240098/8f7241b0-af12-493f-a488-2dc996c6b524">

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BalanceIncreased(uint256 amount);
    event decreased(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function getAddres() external view returns (address) {
        return (address(this));
    }

    function viewOwner() public view returns (address) {
        return owner;
    }

    function increaseBalance(uint256 _amount) public {

        balance += _amount;
    }

    function showBalance() external view returns (uint) {
        return address(this).balance;
    }
    function decrease(uint _amount) external{ 
        balance-=_amount;
    }
}
To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.9" (or another compatible version), and then click on the ("Compile "the name of the file" ") for ex. comple first.sol button. Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "Assessment.sol" contract from the dropdown menu, and then click on the "Deploy" button. then u can see a the below of the option ' Deployed/Unpinned Contracts ' expand it and balances mint burn etc and now u can see our code is ready to run .

## Authors

Contributors names and contact info

ex. ASHVINI KUMAR 
ex. ashvinikumarcuchd123@gmail.com


## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
