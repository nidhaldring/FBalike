
const { findUser, createUser } = require('../services/user');
const { asyncErrorHandler, CustomError } = require('../helpers');
const {sendMail, getWelcomeMail } = require('../helpers/email');
const { HTTP } = require('../constantes');

const login = asyncErrorHandler(async (req, res, next) => {
    const foundUser = await findUser(req.body.email, req.body.password);
    if (foundUser) {
        const jwt = await foundUser.generateJWT();
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
    res.status(HTTP.CREATED).json({ email, username });

    await sendMail(await getWelcomeMail(user));
});

module.exports = {
    login,
    register
}
