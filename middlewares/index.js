
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const { User } = require('../models');
const { decodeToken, CustomError } = require('../helpers');
const { HTTP } = require('../constantes');

function logAllRequests(req, res, next) {
    console.log(chalk `{red.bold ${req.method}} {blue.bold ${req.url}}`);
    next();
}

async function checkAuth(req, res, next) {
     try {
        const token = await decodeToken(req.cookies.jwt);
        console.log('this is ' + token);
        req.user = await User.findOne().lean();
        next();
    } catch (err) {
        console.log();
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
}


function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(err.code).json({});
}

module.exports = {
    checkAuth,
    logAllRequests,
    handleErrors
};
