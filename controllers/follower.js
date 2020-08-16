
const { User } = require('../models');
const { CustomError, asyncErrorHandler } = require('../helpers');
const { HTTP } = require('../constantes');
const { followUser, unfollowUser } = require('../services/follower');

const addFollower = asyncErrorHandler(async (req, res) => {
    const followedId = req.params.id;
    const user = req.user;

    await followUser(user._id, followedId);

    res.status(HTTP.CREATED).json({});
});

const deleteFollower = asyncErrorHandler(async (req, res) => {
    const followedId = req.params.id;
    const user = req.user;

    const followedFound = (await User.findById(followedId).exec()) !== null;
    if (user._id === followedId || !followedFound) {
        return next(new CustomError(HTTP.ERROR));
    }
    await unfollowUser(req.user._id, followedId);

    res.json({});
});

module.exports = {
    addFollower,
    deleteFollower
};