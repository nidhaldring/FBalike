const jwt = require('jsonwebtoken');
const config = require('../config');
const { HTTP } = require('../constantes');

function removeFromArray(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

async function decodeToken(token) {
    const key = config.app.secretKey;
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        })
    });
}

function asyncErrorHandler(func) {
    return async function(req, res, next) {
        try {
            await func(req, res, next);
        } catch (err) {
            console.log(err);
            next(new CustomError(err.statusCode));
        }
    }
}

class CustomError {
    constructor(code) {
        this.code = code || HTTP.ERROR;
    }
}

module.exports = {
    decodeToken,
    asyncErrorHandler,
    removeFromArray,
    CustomError
};
