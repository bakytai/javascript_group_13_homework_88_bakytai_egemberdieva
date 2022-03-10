const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        validate: {
            validator: async function (value)  {
                if (!value) return false

                return true
            },
        },
        required: this.validate
    },
    image: {
        type: String,
        validate: {
            validator: async function (value) {
                if (!value) return false

                return true
            }
        },
        required: this.validate
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;