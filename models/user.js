const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 6
    },
    // add validation here
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    followers: [
        {
        type: Types.ObjectId,
        ref: 'User'
        }
    ],
    followings: [
        {
        type: Types.ObjectId,
        ref: 'User'
        }
    ]
});


// set up pre hooks
UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// set up methods
UserSchema.methods.verifyPassword = async function(password) {
    // TODO: consider when user is not saved yet !
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateJWT = async function() {
    const key = config.app.secretKey;
    // change this to be async in any way
    // thou it doens't seem to support it for some reason !
    return jwt.sign({ uid: this._id }, key);
}

// UserSchema.methods.follow = async function(userId) {
//     this.following.push(userId);
//     return await this.save();
// }

module.exports = model('User', UserSchema, 'users');
