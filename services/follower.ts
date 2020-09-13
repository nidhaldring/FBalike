import { UserModel, User } from '../models';
import { removeFromArray, CustomError } from '../helpers';
import { HTTP } from '../constantes';

const followUser = async (followerId: string, followedId: string) => {
    const followedFound = (await UserModel.findById(followedId).exec()) !== null;
    if (followedId === followerId || !followedFound) {
        throw new CustomError(HTTP.ERROR);
    }

    const follower = await UserModel.findById(followerId);
    const followed = await UserModel.findById(followedId);

    follower.followings.push(followedId as any);
    followed.followers.push(followerId as any);

    await follower.save();
    await followed.save();
}

const unfollowUser = async (followerId: string, followedId: string) => {
    const follower = await UserModel.findById(followerId);
    const followed = await UserModel.findById(followedId);
    
    removeFromArray(follower.followings, followedId);
    removeFromArray(followed.followers, followerId);

    await follower.save();
    await followed.save();
}

export {
    followUser,
    unfollowUser
};