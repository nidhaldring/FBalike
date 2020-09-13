import { PostModel, Post } from '../models';
import { CustomError } from '../helpers';
import { HTTP } from '../constantes';

const getPostById = async (postId: string): Promise<Post> => {
    return PostModel.findById(postId).lean();
}

const createPost = async (postBody: Post): Promise<Post> => {
    return PostModel.create(postBody);
}

const deletePost = async (postId: string) => {
    try {
        return await PostModel.deleteOne({
            id: postId
        });
    } catch (err) {
        throw new CustomError(HTTP.NOT_FOUND);
    }
}

export {
    getPostById,
    createPost,
    deletePost
};