const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery Contract", function () {
    let Lottery;
    let lottery;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;

    beforeEach(async function () {
        Lottery = await ethers.getContractFactory("Lottery");
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

        lottery = await Lottery.deploy();

    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await lottery.Owner()).to.equal(owner.address);
        });
    });

    describe("Registration", function () {
        const ethervalue = 2 * (Math.pow(10, 18));
        const ether1value = 1 * (Math.pow(10, 18));
        it("Should register participants correctly", async function () {

            await lottery.connect(addr1).Registration("Alice", { value: ethervalue.toString() });
            expect(await lottery.Participants(addr1.address)).to.equal("Alice");

            await lottery.connect(addr2).Registration("Bob", { value: ethervalue.toString() });
            expect(await lottery.Participants(addr2.address)).to.equal("Bob");
        });

        it("Should fail if participant doesn't pay 2 ether", async function () {
            await expect(
                lottery.connect(addr1).Registration("Alice", { value: ether1value.toString() })
            ).to.be.revertedWith("we can pay the 2 ether for particiapting the Lottery");
        });

        it("Should fail if participant is already registered", async function () {
            await lottery.connect(addr1).Registration("Alice", { value: ethervalue.toString() });
            await expect(
                lottery.connect(addr1).Registration("Alice", { value: ethervalue.toString() })
            ).to.be.revertedWith("already registered");
        });
    });

    describe("Pick Winner", function () {
        const ethervalue = 2 * (Math.pow(10, 18));
        const ether1value = 1 * (Math.pow(10, 18));
        beforeEach(async function () {
            await lottery.connect(addr1).Registration("Alice", { value: ethervalue.toString() });
            await lottery.connect(addr2).Registration("Bob", { value: ethervalue.toString() });
            await lottery.connect(addr3).Registration("Charlie", { value: ethervalue.toString() });
        });

        it("Should pick a winner correctly", async function () {
            await lottery.pickWinner();
            const winnerPickedEvent = await lottery.queryFilter("WinnerPicked", 0, "latest");
            const event = winnerPickedEvent[0];

            const winnerAddress = event.args._owneraddr;
            const winnerName = event.args._ownername;

            expect([addr1.address, addr2.address, addr3.address]).to.include(winnerAddress);
            expect(["Alice", "Bob", "Charlie"]).to.include(winnerName);
        });

        it("Should transfer the balance to the winner", async function () {
            const initialBalance = await ethers.provider.getBalance(addr1.address);

            await lottery.pickWinner();

            const finalBalance = await ethers.provider.getBalance(addr1.address);
            const contractBalance = await ethers.provider.getBalance(lottery.address);

            expect(contractBalance).to.equal(0);
            expect(finalBalance).to.be.above(initialBalance);
        });

        it("Should fail if called by non-owner", async function () {
            await expect(lottery.connect(addr1).pickWinner()).to.be.revertedWith("you are not a owner");
        });

        it("Should fail if there are less than 3 participants", async function () {
            await lottery.connect(addr4).Registration("David", { value: ethervalue.toString() });
            await expect(lottery.pickWinner()).to.be.revertedWith("There must be three participants");
        });

        it("Should fail if the lottery already happened", async function () {
            await lottery.pickWinner();
            await expect(lottery.pickWinner()).to.be.revertedWith("lottery already happened");
        });
    });

    describe("Contract Balance", function () {
        const ethervalue = 2 * (Math.pow(10, 18));
        const ether1value = 6 * (Math.pow(10, 18));
        it("Should return the correct contract balance", async function () {
            await lottery.connect(addr1).Registration("Alice", { value: ethervalue.toString() });
            await lottery.connect(addr2).Registration("Bob", { value: ethervalue.toString() });
            await lottery.connect(addr3).Registration("Charlie", { value: ethervalue.toString() });

            const contractBalance = await lottery.contract_bal();
            expect(contractBalance).to.equal(ether1value.toString());
        });
    });

    describe("Owner Address", function () {
        it("Should return the correct owner address", async function () {
            expect(await lottery.Owneraddr()).to.equal(owner.address);
        });
    });

    describe("Check Balance", function () {
        it("Should return the correct balance of an address", async function () {
            const balance = await lottery.checkBalance(addr1.address);
            expect(balance).to.equal(await ethers.provider.getBalance(addr1.address));
        });
    });
});
