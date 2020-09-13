
import { UserModel } from '../models';
import { CustomError, asyncErrorHandler } from '../helpers';
import { HTTP } from '../constantes';
import { followUser, unfollowUser } from '../services/follower';

const addFollower = asyncErrorHandler(async (req, res) => {
    const followedId = req.params.id;
    const user = req.user;

    await followUser(user._id, followedId);

    res.status(HTTP.CREATED).json({});
});

const deleteFollower = asyncErrorHandler(async (req, res, next) => {
    const followedId = req.params.id;
    const user = req.user;

    const followedFound = (await UserModel.findById(followedId).exec()) !== null;
    if (user._id === followedId || !followedFound) {
        return next(new CustomError(HTTP.ERROR));
    }
    await unfollowUser(req.user._id, followedId);

    res.json({});
});

export {
    addFollower,
    deleteFollower
};