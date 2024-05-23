const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nero", function () {
  let Nero, nero:any, owner:any, addr1:any, addr2:any, minterRole:any, addrs:any;

  beforeEach(async function () {
    Nero = await ethers.getContractFactory("Nero");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nero = await Nero.deploy(100, addr1.address); // maxSupply of 100
    await nero.deployed();
    minterRole = await nero.MINTER_ROLE();
  });

  describe("Deployment", function () {
    console.log(nero);
    it("Should set the right owner", async function () {
      expect(await nero.owner()).to.equal(owner.address);
    });

    it("Should set the max supply correctly", async function () {
      expect(await nero.maxSupply()).to.equal(100);
    });

    it("Should grant MINTER_ROLE to the specified address", async function () {
      expect(await nero.hasRole(minterRole, addr1.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    it("Should mint tokens correctly", async function () {
      await nero.mint(1);
      expect(await nero.totalSupply()).to.equal(1);
      expect(await nero.balanceOf(owner.address)).to.equal(1);
    });

    it("Should not mint more than max supply", async function () {
      await nero.mint(100);
      await expect(nero.mint(1)).to.be.revertedWith("no more tokens to mint");
    });

    it("Should not mint more than max supply in a single transaction", async function () {
      await expect(nero.mint(101)).to.be.revertedWith("cannot mint more than max supply");
    });
  });

  describe("Locking", function () {
    it("Should lock the contract correctly", async function () {
      await nero.lock();
      expect(await nero.locked()).to.be.true;
    });

    it("Should not lock the contract if already locked", async function () {
      await nero.lock();
      await expect(nero.lock()).to.be.revertedWith("already locked");
    });
  });

  describe("Updating scoreboard", function () {
    it("Should update the scoreboard correctly", async function () {
      await nero.mint(1);
      await nero.connect(addr1).updateScoreboard(0, 10);
      expect(await nero.scoreboard(0)).to.equal(10);
    });

    it("Should not update the scoreboard if not MINTER_ROLE", async function () {
      await nero.mint(1);
      await expect(nero.updateScoreboard(0, 10)).to.be.revertedWith(
        `AccessControlUnauthorizedAccount`
      );
    });

    it("Should not reduce the scoreboard value", async function () {
      await nero.mint(1);
      await nero.connect(addr1).updateScoreboard(0, 10);
      await expect(nero.connect(addr1).updateScoreboard(0, 5)).to.be.revertedWith(
        "cannot reduce the scoreboard must be bigger total"
      );
    });

    it("Should not update the scoreboard for non-existent NFT", async function () {
      await expect(nero.connect(addr1).updateScoreboard(1, 10)).to.be.revertedWith("nft not exists");
    });
  });

  describe("URI management", function () {
    it("Should update unlocked GLB URI correctly", async function () {
      const newURI = ethers.utils.formatBytes32String("new unlocked GLB URI");
      await nero.updateUnlockedGlb(newURI);
      expect(await nero.unlockedGlbURI()).to.equal(newURI);
    });

    it("Should update unlocked Background URI correctly", async function () {
      const newURI = ethers.utils.formatBytes32String("new unlocked Background URI");
      await nero.updateUnlockedBackground(newURI);
      expect(await nero.unlockedBackgroundURI()).to.equal(newURI);
    });

    it("Should update locked GLB URI correctly", async function () {
      const newURI = ethers.utils.formatBytes32String("new locked GLB URI");
      await nero.updateLockedGlb(newURI);
      expect(await nero.lockedGlbURI()).to.equal(newURI);
    });

    it("Should update locked Background URI correctly", async function () {
      const newURI = ethers.utils.formatBytes32String("new locked Background URI");
      await nero.updateLockedBackground(newURI);
      expect(await nero.lockedBackgroundURI()).to.equal(newURI);
    });

    it("Should revert updating unlocked URIs if locked", async function () {
      const newURI = ethers.utils.formatBytes32String("new unlocked GLB URI");
      await nero.lock();
      await expect(nero.updateUnlockedGlb(newURI)).to.be.revertedWith("nft already locked");
    });

    it("Should revert updating locked GLB URI if locked", async function () {
      const newURI = ethers.utils.formatBytes32String("new locked GLB URI");
      await nero.lock();
      await expect(nero.updateLockedGlb(newURI)).to.be.revertedWith("nft already locked");
    });
  });

  describe("tokenURI", function () {
    it("Should return the correct locked GLB URI", async function () {
      const lockedURI = ("locked GLB URI");
      await nero.updateLockedGlb(lockedURI);
      await nero.mint(1);
      expect(await nero.tokenURI(0)).to.equal(lockedURI);
    });

    it("Should revert for non-existent token", async function () {
      await expect(nero.tokenURI(1)).to.be.revertedWith("URIQueryForNonexistentToken");
    });
  });
});
