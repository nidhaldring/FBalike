import bcrypt from 'bcrypt';
import { default as jwt } from 'jsonwebtoken';
import config from '../config';
import { Post } from './post';
import { 
    prop, 
    getModelForClass, 
    Ref, 
    pre, 
    DocumentType 
} from '@typegoose/typegoose';

async function hashPassword(this: DocumentType<User>) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
}

@pre<User>('save', hashPassword)
class User {
    @prop({
        required: true,
        minlength: 6
    })
    username: string;

    @prop({
        required: true,
        minlength: 6
    })
    password: string;

    @prop({
        required: true,
        unique: true
    })
    email: string;

    @prop()
    followers: Ref<User>[];

    @prop()
    followings: Ref<User>[];

    @prop()
    posts: Ref<Post>[];


    verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    generateJWT(this: DocumentType<User>): string {
        const key = config.app.secretKey;
        // change this to be async in any way
        // thou it doens't seem to support it for some reason !
        return jwt.sign({ uid: this._id }, key);
    }
}

const UserModel = getModelForClass(User);

export {
    User,
    UserModel
};