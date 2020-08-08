
const { User } = require('../models');

const createUser = async (userBody) => {
    const user = new User(userBody);
    return user.save().lean();
}

const updateProfile = async (userId, newBody) => {
    return await User.findOne({ _id: userId })
        .exec()
        .updateOne(userBody)
        .lean();
}

module.exports = {
    createUser,
    updateProfile
};
