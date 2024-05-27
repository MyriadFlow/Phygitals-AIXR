const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nero", function () {
  let Nero, nero: any, owner: any, addr1:any , addr2: any, minterRole: any, addrs: any;
  const pricePerTokenMint = ethers.utils.parseEther("0.01");

  beforeEach(async function () {
    Nero = await ethers.getContractFactory("Nero");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nero = await Nero.deploy(
      "Nero",
      "NERO",
      100, // maxSupply
      pricePerTokenMint,
      addr1.address, // MINTER_ROLE
      10,  // bronzeTierUnlock
      100, // silverTierUnlock
      200  // goldTierUnlock
    );
    await nero.deployed();
    minterRole = await nero.MINTER_ROLE();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nero.owner()).to.equal(owner.address);
    });

    it("Should set the max supply correctly", async function () {
      expect(await nero.maxSupply()).to.equal(100);
    });

    it("Should grant MINTER_ROLE to the specified address", async function () {
      expect(await nero.hasRole(minterRole, addr1.address)).to.be.true;
    });

    it("Should set the price per token correctly", async function () {
      expect(await nero.pricePerTokenMint()).to.equal(pricePerTokenMint);
    });

    it("Should set the tier unlock levels correctly", async function () {
      expect(await nero.bronzeTierUnlock()).to.equal(10);
      expect(await nero.silverTierUnlock()).to.equal(100);
      expect(await nero.goldTierUnlock()).to.equal(200);
    });
  });

  describe("Minting", function () {
    it("Should mint tokens correctly", async function () {
      await nero.mint(1, { value: pricePerTokenMint });
      expect(await nero.totalSupply()).to.equal(1);
      expect(await nero.balanceOf(owner.address)).to.equal(1);
    });

    it("Should not mint more than max supply", async function () {
      await nero.mint(100, { value: pricePerTokenMint.mul(100) });
      await expect(nero.mint(1, { value: pricePerTokenMint })).to.be.revertedWith("no more tokens to mint");
    });

    it("Should not mint more than max supply in a single transaction", async function () {
      await expect(nero.mint(101, { value: pricePerTokenMint.mul(101) })).to.be.revertedWith("cannot mint more than max supply");
    });

    it("Should require correct payment to mint", async function () {
      await expect(nero.mint(1, { value: ethers.utils.parseEther("0.005") })).to.be.revertedWith("please pay required amount to mint");
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
      await nero.mint(1, { value: pricePerTokenMint });
      await nero.connect(addr1).updateScoreboard(0, 10);
      expect(await nero.scoreboard(0)).to.equal(10);
    });

    it("Should not update the scoreboard if not MINTER_ROLE", async function () {
      await nero.mint(1, { value: pricePerTokenMint });
      await expect(nero.updateScoreboard(0, 10)).to.be.revertedWith(
        `AccessControlUnauthorizedAccount`
      );
    });

    it("Should not reduce the scoreboard value", async function () {
      await nero.mint(1, { value: pricePerTokenMint });
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
      const newURI = "new unlocked GLB URI";
      await nero.updateUnlockedGlb(newURI);
      expect(await nero.unlockedGlbURI()).to.equal(newURI);
    });

    it("Should update unlocked Background URI correctly", async function () {
      const newURI = "new unlocked Background URI";
      await nero.updateUnlockedBackground(newURI);
      expect(await nero.unlockedBackgroundURI()).to.equal(newURI);
    });

    it("Should update locked GLB URI correctly", async function () {
      const newURI = "new locked GLB URI";
      await nero.updateLockedGlb(newURI);
      expect(await nero.lockedGlbURI()).to.equal(newURI);
    });

    it("Should update locked Background URI correctly", async function () {
      const newURI = "new locked Background URI";
      await nero.updateLockedBackground(newURI);
      expect(await nero.lockedBackgroundURI()).to.equal(newURI);
    });

    it("Should revert updating unlocked URIs if locked", async function () {
      const newURI = "new unlocked GLB URI";
      await nero.lock();
      await expect(nero.updateUnlockedGlb(newURI)).to.be.revertedWith("nft already locked");
    });

    it("Should revert updating locked GLB URI if locked", async function () {
      const newURI = "new locked GLB URI";
      await nero.lock();
      await expect(nero.updateLockedGlb(newURI)).to.be.revertedWith("nft already locked");
    });

    it("Should update metadata correctly", async function () {
      const unlockedGlbURI = "new unlocked GLB URI";
      const unlockedBackgroundURI = "new unlocked Background URI";
      const lockedGlbURI = "new locked GLB URI";
      const lockedBackgroundURI = "new locked Background URI";
      const publicKnowledgeLink = "new public knowledge";
      const privateKnowledgeLink = "new private knowledge";
      const metadataURI = "new metadata URI";

      await nero.updateMetadata(
        unlockedGlbURI,
        unlockedBackgroundURI,
        lockedGlbURI,
        lockedBackgroundURI,
        publicKnowledgeLink,
        privateKnowledgeLink,
        metadataURI
      );

      expect(await nero.unlockedGlbURI()).to.equal(unlockedGlbURI);
      expect(await nero.unlockedBackgroundURI()).to.equal(unlockedBackgroundURI);
      expect(await nero.lockedGlbURI()).to.equal(lockedGlbURI);
      expect(await nero.lockedBackgroundURI()).to.equal(lockedBackgroundURI);
      expect(await nero.publicKnowledgeLink()).to.equal(publicKnowledgeLink);
      expect(await nero.privateKnowledgeLink()).to.equal(privateKnowledgeLink);
      expect(await nero.metadataURI()).to.equal(metadataURI);
    });

    it("Should revert updating metadata if locked", async function () {
      await nero.lock();
      await expect(
        nero.updateMetadata(
          "new unlocked GLB URI",
          "new unlocked Background URI",
          "new locked GLB URI",
          "new locked Background URI",
          "new public knowledge",
          "new private knowledge",
          "new metadata URI"
        )
      ).to.be.revertedWith("nft already locked");
    });
  });

  describe("tokenURI", function () {
    it("Should return the correct metadata URI", async function () {
      const metadataURI = "metadata URI";
      await nero.updateMetadata(
        "unlocked GLB URI",
        "unlocked Background URI",
        "locked GLB URI",
        "locked Background URI",
        "public knowledge",
        "private knowledge",
        metadataURI
      );
      await nero.mint(1, { value: pricePerTokenMint });
      expect(await nero.tokenURI(0)).to.equal(metadataURI);
    });

    it("Should revert for non-existent token", async function () {
      await expect(nero.tokenURI(1)).to.be.revertedWith("URIQueryForNonexistentToken");
    });
  });

  describe("getDanceMove", function () {
    it("Should return correct dance move based on scoreboard", async function () {
      await nero.mint(1, { value: pricePerTokenMint });
      await nero.connect(addr1).updateScoreboard(0, 5);
      expect(await nero.getDanceMove(0)).to.equal(0); // normal

      await nero.connect(addr1).updateScoreboard(0, 10);
      expect(await nero.getDanceMove(0)).to.equal(1); // bronze tier

      await nero.connect(addr1).updateScoreboard(0, 100);
      expect(await nero.getDanceMove(0)).to.equal(2); // silver tier

      await nero.connect(addr1).updateScoreboard(0, 200);
      expect(await nero.getDanceMove(0)).to.equal(3); // gold tier
    });

    it("Should revert if token does not exist", async function () {
      await expect(nero.getDanceMove(1)).to.be.revertedWith("token does not exist");
    });
  });
});
