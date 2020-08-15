
const { User } = require('../models');

const createUser = async (userBody) => {
    const user = new User(userBody);
    return user.save();
}

const updateMyProfile = async (userId, newBody) => {
    const user = await User.findById(userId).exec();
    for (const key of Object.keys(newBody)) {
        user[key] = newBody[key];
    }
    return await user.save();
}

const findUser = async (email, password) => {
    const user = await User.findOne({ email }).exec();
    return user && await user.verifyPassword(password) ? user : null;
}

module.exports = {
    createUser,
    updateMyProfile,
    findUser
};
