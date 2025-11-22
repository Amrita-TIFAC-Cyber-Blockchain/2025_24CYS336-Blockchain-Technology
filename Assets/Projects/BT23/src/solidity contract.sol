// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserRegistry {
    struct User {
        string username;
        string bio;
        bytes32 passwordHash;
        uint256 registeredAt;
    }

    struct Post {
        string text;
        string image; 
        uint256 timestamp;
        uint256 likeCount;
        mapping(address => bool) likes;
    }

    struct PostView {
        string text;
        string image;
        uint256 timestamp;
        uint256 likeCount;
        bool userLiked;
    }

    mapping(address => User) public users;
    mapping(string => bool) public usernameTaken;
    mapping(string => address) public usernameToAddress;
    mapping(address => Post[]) private userPosts;
    address[] private userAddresses;
    event UserRegistered(address indexed userAddress, string username, uint256 timestamp);
    event PostCreated(address indexed userAddress, string text, string image, uint256 timestamp);
    event PostLiked(address indexed userAddress, uint256 postIndex, address indexed liker);
    event PostUnliked(address indexed userAddress, uint256 postIndex, address indexed unliker);

    modifier onlyUnregistered() {
        require(users[msg.sender].registeredAt == 0, "User already registered");
        _;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].registeredAt > 0, "User not registered");
        _;
    }

    
    function register(
    string memory _username,
    string memory _bio,
    string memory _password
) external onlyUnregistered {
    require(bytes(_username).length >= 3, "Username must be at least 3 characters");
    require(bytes(_bio).length <= 200, "Bio too long");
    require(bytes(_password).length >= 8, "Password must be at least 8 characters");
    require(!usernameTaken[_username], "Username already taken");

    users[msg.sender] = User({
        username: _username,
        bio: _bio,
        passwordHash: keccak256(abi.encodePacked(_password)),
        registeredAt: block.timestamp
    });

    usernameToAddress[_username] = msg.sender;
    usernameTaken[_username] = true;
    userAddresses.push(msg.sender); 

    emit UserRegistered(msg.sender, _username, block.timestamp);
}

    
    function verifyLogin(string memory _password) external view returns (bool) {
        User storage user = users[msg.sender];
        if (user.registeredAt == 0) return false;
        return user.passwordHash == keccak256(abi.encodePacked(_password));
    }
    function loginWithUsername(
    string memory _username,
    string memory _password
    ) external view returns (bool, address) {
        address userAddr = usernameToAddress[_username];
        if (userAddr == address(0)) return (false, address(0));

        User storage user = users[userAddr];
        if (user.passwordHash != keccak256(abi.encodePacked(_password))) {
            return (false, address(0));
        }

        return (true, userAddr);
    }


    function getUserByUsername(string memory _username)
        external
        view
        returns (string memory, string memory, uint256)
    {
        address userAddr = usernameToAddress[_username];
        require(userAddr != address(0), "Username not found");
        User storage user = users[userAddr];
        return (user.username, user.bio, user.registeredAt);
    }

    function isRegistered(address _userAddress) external view returns (bool) {
        return users[_userAddress].registeredAt > 0;
    }

    function isUsernameAvailable(string memory _username) external view returns (bool) {
        return !usernameTaken[_username];
    }

    
    function createPost(string memory _text, string memory _image) external onlyRegistered {
        require(bytes(_text).length > 0 || bytes(_image).length > 0, "Post must contain text or image");

        Post storage newPost = userPosts[msg.sender].push();
        newPost.text = _text;
        newPost.image = _image;
        newPost.timestamp = block.timestamp;
        newPost.likeCount = 0;

        emit PostCreated(msg.sender, _text, _image, block.timestamp);
    }

    function getPostCount(address _userAddress) external view returns (uint256) {
        return userPosts[_userAddress].length;
    }

    function getPost(address _userAddress, uint256 index)
        external
        view
        returns (string memory, string memory, uint256, uint256, bool)
    {
        require(index < userPosts[_userAddress].length, "Invalid post index");
        Post storage post = userPosts[_userAddress][index];
        bool userLiked = post.likes[msg.sender];
        return (post.text, post.image, post.timestamp, post.likeCount, userLiked);
    }

    function getAllPosts(address _userAddress)
        external
        view
        returns (PostView[] memory)
    {
        uint256 postCount = userPosts[_userAddress].length;
        PostView[] memory posts = new PostView[](postCount);
        
        for (uint256 i = 0; i < postCount; i++) {
            Post storage post = userPosts[_userAddress][i];
            posts[i] = PostView({
                text: post.text,
                image: post.image,
                timestamp: post.timestamp,
                likeCount: post.likeCount,
                userLiked: post.likes[msg.sender]
            });
        }
        
        return posts;
    }

    function likePost(address _userAddress, uint256 _postIndex) external onlyRegistered {
        require(_userAddress != address(0), "Invalid user address");
        require(_postIndex < userPosts[_userAddress].length, "Invalid post index");
        
        Post storage post = userPosts[_userAddress][_postIndex];
        require(!post.likes[msg.sender], "Already liked");
        
        post.likes[msg.sender] = true;
        post.likeCount++;
        
        emit PostLiked(_userAddress, _postIndex, msg.sender);
    }

    function unlikePost(address _userAddress, uint256 _postIndex) external onlyRegistered {
        require(_userAddress != address(0), "Invalid user address");
        require(_postIndex < userPosts[_userAddress].length, "Invalid post index");
        
        Post storage post = userPosts[_userAddress][_postIndex];
        require(post.likes[msg.sender], "Not liked");
        
        post.likes[msg.sender] = false;
        post.likeCount--;
        
        emit PostUnliked(_userAddress, _postIndex, msg.sender);
    }

    function hasLikedPost(address _userAddress, uint256 _postIndex) external view returns (bool) {
        require(_userAddress != address(0), "Invalid user address");
        require(_postIndex < userPosts[_userAddress].length, "Invalid post index");
        
        return userPosts[_userAddress][_postIndex].likes[msg.sender];
    }
    function searchUsers(string memory _query) external view returns (address[] memory, string[] memory) {
    uint256 count = 0;
    
    
    for (uint256 i = 0; i < userAddresses.length; i++) {
        if (containsSubstring(users[userAddresses[i]].username, _query)) {
            count++;
        }
    }
    
    address[] memory matchedAddresses = new address[](count);
    string[] memory matchedUsernames = new string[](count);
    
    uint256 index = 0;
    for (uint256 i = 0; i < userAddresses.length; i++) {
        if (containsSubstring(users[userAddresses[i]].username, _query)) {
            matchedAddresses[index] = userAddresses[i];
            matchedUsernames[index] = users[userAddresses[i]].username;
            index++;
        }
    }
    
    return (matchedAddresses, matchedUsernames);
}

function containsSubstring(string memory _string, string memory _substring) private pure returns (bool) {
    bytes memory stringBytes = bytes(_string);
    bytes memory substringBytes = bytes(_substring);
    
    if (substringBytes.length == 0) return true;
    if (stringBytes.length < substringBytes.length) return false;
    
    for (uint i = 0; i <= stringBytes.length - substringBytes.length; i++) {
        bool found = true;
        for (uint j = 0; j < substringBytes.length; j++) {
            if (stringBytes[i + j] != substringBytes[j]) {
                found = false;
                break;
            }
        }
        if (found) return true;
    }
    return false;
}
}