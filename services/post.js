const Post = require('../models');
const { CustomError } = require('../helpers');
const { HTTP } = require('../constantes');

const getPostById = async (postId) => {
    return Post.findById(postId).lean();
}

const createPost = async (user, postBody) => {
    const post = new Post({
        author: user,
        ...postBody
    });

    return post.save();
}

const deletePost = async (postId) => {
    try {
        const post = await Post.findById(postId);
        return post.delete();
    } catch (err) {
        throw new CustomError(HTTP.NOT_FOUND);
    }
}

module.exports = {
    getPostById,
    createPost,
    deletePost
};