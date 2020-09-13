
const { findUser, createUser } = require('../services/user');
import { Request, Response, NextFunction } from 'express';
import { asyncErrorHandler, CustomError } from '../helpers';
import {sendMail, getWelcomeMail } from '../helpers/email';
import { HTTP } from '../constantes';

const login = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const foundUser = await findUser(req.body.email, req.body.password);
    if (foundUser) {
        const jwt = await foundUser.generateJWT();
        res.json({ jwt });
    } else {
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
});

const register =  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        username,
        password
    } = req.body;
    // TODO: return proper http status code here for duplicate email
    const user = await createUser({ email, username, password });
    res.status(HTTP.CREATED).json({ email, username });
    await sendMail(await getWelcomeMail(user.email, user.username));
});

export {
    login,
    register
}
