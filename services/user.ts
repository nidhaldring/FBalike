
import { User, UserModel } from '../models';

const createUser = async (userBody: User) => {
    return UserModel.create(userBody);
}

const updateMyProfile = async (userId: string, newBody: Partial<User>): Promise<User> => {
    return await UserModel.findByIdAndUpdate(userId, newBody)
}

const findUser = async (email: string, password: string): Promise<User> => {
    const user: User = await UserModel.findOne({ email }).exec();
    return user && await user.verifyPassword(password) ? user : null;
}

export {
    createUser,
    updateMyProfile,
    findUser
};
