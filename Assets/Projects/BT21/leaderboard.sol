// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Leaderboard
 * @dev Keeps a small on-chain top-K list (K=10) of addresses with highest score (token balance).
 * Only the PETToken contract (set as `petToken`) can call update().
 *
 * NOTE: This is a demo-friendly on-chain tracker. For large-scale apps, compute leaderboards off-chain.
 */
contract Leaderboard {
    address public petToken; // only this contract can call update
    address public owner;
    uint256 public constant K = 10;

    struct Entry {
        address addr;
        uint256 score;
    }

    Entry[K] public top;

    modifier onlyPetToken() {
        require(msg.sender == petToken, "Only pet token can update");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setPetToken(address tokenAddr) public onlyOwner {
        petToken = tokenAddr;
    }

    /**
     * @dev Called by PETToken after a balance change for `user`.
     * We attempt to keep `top` sorted descending by score.
     */
    function update(address user, uint256 newBalance) external onlyPetToken {
        // check if user is already in top list
        int256 foundIndex = -1;
        for (uint256 i = 0; i < K; i++) {
            if (top[i].addr == user) {
                foundIndex = int256(i);
                break;
            }
        }

        if (foundIndex >= 0) {
            // update score and re-order up or down
            uint256 idx = uint256(foundIndex);
            top[idx].score = newBalance;

            // move up while greater than previous
            while (idx > 0 && top[idx].score > top[idx - 1].score) {
                Entry memory tmp = top[idx - 1];
                top[idx - 1] = top[idx];
                top[idx] = tmp;
                idx--;
            }
            // move down while less than next
            while (idx + 1 < K && top[idx].score < top[idx + 1].score) {
                Entry memory tmp = top[idx + 1];
                top[idx + 1] = top[idx];
                top[idx] = tmp;
                idx++;
            }
            return;
        }

        // not found: maybe it should enter the leaderboard
        // if it doesn't beat the last, ignore
        if (newBalance <= top[K-1].score) {
            return;
        }

        // insert at end then bubble up
        top[K-1].addr = user;
        top[K-1].score = newBalance;
        uint256 j = K - 1;
        while (j > 0 && top[j].score > top[j - 1].score) {
            Entry memory tmp = top[j - 1];
            top[j - 1] = top[j];
            top[j] = tmp;
            j--;
        }
    }

    /**
     * @dev Return the top K addresses and scores (two arrays)
     */
    function getTop() external view returns (address[] memory, uint256[] memory) {
        address[] memory addrs = new address[](K);
        uint256[] memory scores = new uint256[](K);
        for (uint256 i = 0; i < K; i++) {
            addrs[i] = top[i].addr;
            scores[i] = top[i].score;
        }
        return (addrs, scores);
    }
}
