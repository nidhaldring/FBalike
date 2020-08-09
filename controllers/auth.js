
const { findUser, createUser } = require('../services/user');
const { asyncErrorHandler, CustomError } = require('../helpers');
const { HTTP } = require('../config');

const login = asyncErrorHandler(async (req, res, next) => {
    const foundUser = await findUser(req.body.email, req.body.password);
    if (foundUser) {
        console.log(foundUser);
        const jwt = await foundUser.generateJWT();
        console.log(jwt);
        console.log("ok");
        res.json({ jwt });
    } else {
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
});

const register =  asyncErrorHandler(async (req, res, next) => {
    const {
        email,
        username,
        password
    } = req.body;
    // TODO: return proper http status code here for duplicate email
    const user = await createUser({ email, username, password });
    res.json({ email, username });
});

module.exports = {
    login,
    register
}
