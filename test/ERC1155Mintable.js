const expectThrow = require('./helpers/expectThrow');

const ERC1155Mintable = artifacts.require('ERC1155Mintable.sol');
const ERC1155MockReceiver = artifacts.require('ERC1155MockReceiver.sol');
const BigNumber = require('bignumber.js');

let user1;
let user2;
let user3;
let user4;
let mainContract;
let receiverContract;
let tx;

let zeroAddress = '0x0000000000000000000000000000000000000000';

let hammerId;
let swordId;
let maceId;

let idSet = [];
let quantities = [1, 1, 1];

let gasUsed;
let gasUsedRecords = [];
let gasUsedTotal = 0;

// function recordGasUsed(_tx, _label){
//     gasUsedTotal += _tx.receipt.gasUsed
//     gasUsedRecords.push()
// }

function printGasUsed() {
    console.log('------------------------------------------------------------');
    for (let i = 0; i < gasUsedRecords.length; ++i) {
        console.log(gasUsedRecords[i]);
    }
    console.log(String("Total: " + gasUsedTotal).padStart(60));
    console.log('------------------------------------------------------------');
}

contract('ERC1155 test implementation', (accounts) =>{
    before(async() =>{
        user1 = accounts[1];
        user2 = accounts[2];
        user3 = accounts[3];
        user4 = accounts[4];
        mainContract = await ERC1155Mintable.new();
        receiverContract = await ERC1155MockReceiver.new();
    })

    after(async() => {
        printGasUsed()
    })

    it.only('SafeTransfer no with no balance', async() =>{
        await expectThrow(mainContract.safeTransferFrom(user2, user1, hammerId, 1, web3.utils.fromAscii(''), {from:user2}));
    })
})