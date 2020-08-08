
const userServices = require('../services/user');
const { HTTP }  = require('../constantes');

const createUser = async (req, res) => {
    const user = await userServices.createUser(req.body);
    res.json({
        username: user.username
    });
}

const updateMyProfile = async (req, res) => {
    if (req.user) {
        const user = await userServices.updateMyProfile
        res.json({
            email: user.email,
            username: user.username
        });
    } else {
        res.status(HTTP.UNAUTHORIZED).json({})
    }
}


module.exports = {
    createUser,
    updateMyProfile
};
