
import { asyncErrorHandler } from '../helpers';
import * as postServices from '../services/post';
import { CustomError } from '../helpers';
import { HTTP } from '../constantes';
import { User, Post } from '../models';


const getPostById = asyncErrorHandler(async (req, res, next) => {
    const post = await postServices.getPostById(req.params.id);
    if (!post){
        return next(new CustomError(HTTP.NOT_FOUND));
    }
    res.json(post);
});

const createPost = asyncErrorHandler(async (req, res) => {
    const author: User = req.user;
    const body: Omit<Post, 'author'> = req.body;
    const post = await postServices.createPost({author, ...body});
    res.status(HTTP.CREATED).json(post);
});

const deletePost = asyncErrorHandler(async (req, res) => {
    await postServices.deletePost(req.params.id);
    res.json({});
});

export {
    getPostById,
    createPost,
    deletePost
};