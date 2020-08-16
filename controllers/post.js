
const { asyncErrorHandler } = require('../helpers');
const postServices = require('../services/post');
const { CustomError } = require('../helpers');
const { HTTP } = require('../constantes');


const getPostById = asyncErrorHandler(async (req, res, next) => {
    const post = await postServices.getPostById(req.params.id);
    if (!post){
        return next(new CustomError(HTTP.NOT_FOUND));
    }
    res.json(post);
});

const createPost = asyncErrorHandler(async (req, res) => {
    const post = await postServices.createPost(req.user, req.body);
    res.status(HTTP.CREATED).json(post);
});

const deletePost = asyncErrorHandler(async (req, res) => {
    await postServices.deletePost(req.params.id);
    res.json({});
});

module.exports = {
    getPostById,
    createPost,
    deletePost
};