pragma solidity ^0.8.24;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Nero is ERC721A, Ownable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("NERO_SCOREBOARD_UPDATER");

    mapping(uint256 => uint256) public scoreboard; // mapping between the NFT and the number of visits
    bool public locked = false;
    uint256 public maxSupply;
    string public unlockedGlbURI; // unlocked avatar - token holder access only
    string public unlockedBackgroundURI; // unlocked background - token holder access only

    string public lockedGlbURI; // locked avatar - public access
    string public lockedBackgroundURI; // locked backround - public access

    string public tokenURILink; // single token URI

    uint256 public danceMove;

    constructor(
        string memory name,
        string memory description,
        uint256 supply,
        address nero
    ) ERC721A(name, description) Ownable(msg.sender) {
        maxSupply = supply;
        _grantRole(MINTER_ROLE, nero);
    }

    modifier unlocked() {
        require(!locked, "nft already locked");

        _;
    }

    function updateScoreboard(
        uint256 nftId,
        uint256 total
    ) external onlyRole(MINTER_ROLE) {
        require(
            scoreboard[nftId] < total,
            "cannot reduce the scoreboard must be bigger total"
        );
        require(_exists(nftId), "nft not exists");
        scoreboard[nftId] = total;
    }

    function mint(uint256 quantity) external payable {
        require(
            _totalMinted() < maxSupply && maxSupply > 0,
            "no more tokens to mint"
        );
        require(
            _totalMinted() + quantity <= maxSupply && maxSupply > 0,
            "cannot mint more than max supply"
        );
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }

    /// lock the access to the NFT; once locked you can't unlock it

    function lock() external onlyOwner {
        require(!locked, "already locked");
        locked = true;
    }

    /// return the token URI of the locked GLB

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) _revert(URIQueryForNonexistentToken.selector);

        return
            bytes(lockedGlbURI).length != 0
                ? string(abi.encodePacked(lockedGlbURI))
                : "";
    }

    /// Settings for user content against the NFT
    /// locked content stores the 'uri' of the encrypted content
    /// LIT is used to unlock this access based on NFT token holder

    function updateUnlockedGlb(
        string memory _unlockedGlbURI
    ) public onlyOwner unlocked {
        unlockedGlbURI = _unlockedGlbURI;
    }

    function updateUnlockedBackground(
        string memory _unlockedBackgroundURI
    ) public onlyOwner unlocked {
        unlockedBackgroundURI = _unlockedBackgroundURI;
    }

    function updateLockedGlb(
        string memory _lockedGlbURI
    ) public onlyOwner unlocked {
        lockedGlbURI = _lockedGlbURI;
    }

    function updateLockedBackground(
        string memory _lockedBackgroundURI
    ) public onlyOwner unlocked {
        lockedBackgroundURI = _lockedBackgroundURI;
    }

    function updateMetadata(
        string memory _unlockedGlbURI,
        string memory _unlockedBackgroundURI,
        string memory _lockedGlbURI,
        string memory _lockedBackgroundURI
    ) public onlyOwner unlocked {
        lockedBackgroundURI = _lockedBackgroundURI;
        lockedGlbURI = _lockedGlbURI;
        unlockedBackgroundURI = _unlockedBackgroundURI;
        unlockedGlbURI = _unlockedGlbURI;
    }

    // Sneaker animations: 1-F_Dances_001, 2-005, 3-006, 4-007 & 
    // Guitar Animations: 5-M_Dances_005, 6-008, 7-009 & 8-F_Dances_007
    // if not these no dancing

    function updateDanceMove(uint256 move) public onlyOwner {
        danceMove = move;
    }

    /// Interface overrides

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
