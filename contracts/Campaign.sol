// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfunding {
    struct Milestone {
        string title;
        string description;
        uint256 deadline;
    }

    struct Project {
        address owner;
        string title;
        string category;
        uint256 fundingGoal;
        uint256 duration;
        string description;
        string imageIPFS;
        Milestone[] milestones;
        bool isActive;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectCreated(
        uint256 projectId,
        address owner,
        string title,
        string category,
        uint256 fundingGoal,
        uint256 duration,
        string description,
        string imageIPFS
    );

    modifier onlyConnectedWallet() {
        require(msg.sender != address(0), "Wallet not connected");
        _;
    }

    function createProject(
        string memory _title,
        string memory _category,
        uint256 _fundingGoal,
        uint256 _duration,
        string memory _description,
        string memory _imageIPFS,
        Milestone[] memory _milestones
    ) public onlyConnectedWallet {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_category).length > 0, "Category required");
        require(_fundingGoal > 0, "Funding goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(bytes(_description).length > 0, "Description required");
        require(bytes(_imageIPFS).length > 0, "Image URL required");

        uint256 projectId = projectCount++;
        Project storage newProject = projects[projectId];
        newProject.owner = msg.sender;
        newProject.title = _title;
        newProject.category = _category;
        newProject.fundingGoal = _fundingGoal;
        newProject.duration = _duration;
        newProject.description = _description;
        newProject.imageIPFS = _imageIPFS;
        newProject.isActive = true;

        for (uint256 i = 0; i < _milestones.length; i++) {
            newProject.milestones.push(_milestones[i]);
        }

        emit ProjectCreated(
            projectId,
            msg.sender,
            _title,
            _category,
            _fundingGoal,
            _duration,
            _description,
            _imageIPFS
        );
    }
}
