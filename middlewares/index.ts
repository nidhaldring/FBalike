
import { UserModel } from '../models';
import { decodeToken, CustomError, jwtToken } from '../helpers';
import { HTTP } from '../constantes';
import { RequestHandler, ErrorRequestHandler } from 'express';


const checkAuth: RequestHandler = async (req, res, next) => {
     try {
        const token = req.get('Authorization').split(' ')[1];
        const decoded: jwtToken = await decodeToken(token);
        req.user = await UserModel.findOne({ _id: decoded.uid }).lean();
        next();
    } catch (err) {
        console.log(err);
        next(new CustomError(HTTP.UNAUTHORIZED));
    }
}


const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.code).json({});
}

export {
    checkAuth,
    handleErrors
};
