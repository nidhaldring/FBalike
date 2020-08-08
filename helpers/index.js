const jwt = require('jsonwebtoken');
const config = require('../config');

async function decodeToken(token) {
    const key = config.app.secretKey;
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(deoced);
            }
        })
    });
}

class CustomError {
    constructors(code) {
        this.code = code;
    }
}

module.exports = {
    decodeToken,
    CustomError
};
