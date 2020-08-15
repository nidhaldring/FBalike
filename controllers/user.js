
const userServices = require('../services/user');
const { asyncErrorHandler } = require('../helpers');
const { HTTP }  = require('../constantes');

const createUser = asyncErrorHandler(async (req, res) => {
    const user = await userServices.createUser(req.body);
    res.json({
        username: user.username
    });
});

const updateMyProfile = asyncErrorHandler(async (req, res) => {
    if (req.user) {
        const user = await userServices.updateMyProfile(req.user._id, req.body);
        res.json({
            email: user.email,
            username: user.username
        });
    } else {
        res.status(HTTP.UNAUTHORIZED).json({});
    }
});


module.exports = {
    createUser,
    updateMyProfile
};
