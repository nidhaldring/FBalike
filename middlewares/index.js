
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { decodeToken, CustomError } = require('../helpers');
const { HTTP } = require('../constantes');


async function checkAuth(req, res, next) {
     try {
        const token = req.get('Authorization').split(' ')[1];
        const decoded = await decodeToken(token);
        req.user = await User.findOne({ _id: decoded.uid }).lean();
        next();
    } catch (err) {
        console.log(err);
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
}


function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(err.code).json({});
}

module.exports = {
    checkAuth,
    handleErrors
};
