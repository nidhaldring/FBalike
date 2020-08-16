const {
    Schema,
    model,
    Types
} = require('mongoose');

require('./user');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Post', PostSchema);