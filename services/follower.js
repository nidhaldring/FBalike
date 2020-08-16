const { User } = require('../models');
const { removeFromArray } = require('../helpers');

const followUser = async (followerId, followedId) => {
    const followedFound = (await User.findById(followedId).exec()) !== null;
    if (followedId === followerId || !followedFound) {
        throw new CustomError(HTTP.ERROR);
    }

    const follower = await User.findById(followerId);
    const followed = await User.findById(followedId);

    follower.followings.push(followedId);
    followed.followers.push(followerId);

    await follower.save();
    await followed.save();
}

const unfollowUser = async (followerId, followedId) => {
    const follower = await User.findById(followerId);
    const followed = await User.findById(followedId);
    
    removeFromArray(follower.followings, followedId);
    removeFromArray(followed.followers, followerId);

    await follower.save();
    await followed.save();
}

module.exports = {
    followUser,
    unfollowUser
};