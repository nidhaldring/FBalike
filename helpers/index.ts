import { default as jwt, VerifyErrors }  from 'jsonwebtoken';
import config from '../config';
import { HTTP } from '../constantes';
import { Request, Response, NextFunction, RequestHandler } from 'express';


interface jwtToken {
    uid: string
};

function removeFromArray(arr: any[], value: any): void {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

async function decodeToken(token: string): Promise<jwtToken> {
    const key = config.app.secretKey;
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err: VerifyErrors| null, decoded: object | undefined) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as jwtToken);
            }
        })
    });
}

// use this so that you want write try - catch in every async controller
function asyncErrorHandler(func: RequestHandler): RequestHandler {
    return async function(req, res, next) {
        try {
            await func(req, res, next);
        } catch (err) {
            console.log(err);
            next(new CustomError(err.statusCode || err.code));
        }
    }
}

class CustomError {
    code: number;
    constructor(code: number | undefined) {
        this.code = code || HTTP.ERROR;
    }
}

export {
    decodeToken,
    asyncErrorHandler,
    removeFromArray,
    CustomError,
    jwtToken
};
