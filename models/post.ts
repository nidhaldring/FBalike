import { prop, getModelForClass } from '@typegoose/typegoose';
import { User } from './user';

class Post {
    @prop()
    title: string;

    @prop()
    body: string;

    @prop({
        ref: User
    })
    author: User
}

const PostModel = getModelForClass(Post);


export {
    Post,
    PostModel
};