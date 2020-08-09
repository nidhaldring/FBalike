
const { User } = require('../models');

const createUser = async (userBody) => {
    const user = new User(userBody);
    return user.save();
}

const updateProfile = async (userId, newBody) => {
    return User.findOne({ _id: userId })
        .exec()
        .updateOne(userBody)
        .lean();
}

const findUser = async (email, password) => {
    const user = await User.findOne({ email }).exec();
    return user && await user.verifyPassword(password) ? user : null;
}

module.exports = {
    createUser,
    updateProfile,
    findUser
};
