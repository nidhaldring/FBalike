
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const { User } = require('../models');
const { decodeToken, CustomError } = require('../helpers');
const { HTTP } = require('../constantes');

function logAllRequests(req, res, next) {
    console.log(chalk `{red.bold ${req.method}} to {blue ${req.url}}`);
    next();
}

async function checkAuth(req, res, next) {
     try {
        const token = await decodeToken(req.cookies.jwt);
        req.user = await User.findOne().lean();
        next();
    } catch (err) {
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
}

function errorHandler(func) {
    return async function(req, res, next) {
        try {
            await func(req, res, next);
        } catch (err) {
            next(new CustomError(err.code));
        }
    }
}

function handleErrors(err, req, res, next) {
    res.status(err.code).json({});
}

module.exports = {
    checkAuth,
    logAllRequests,
    errorHandler
};
