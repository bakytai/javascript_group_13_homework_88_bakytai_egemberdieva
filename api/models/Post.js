const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
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
                if (!this.isModified('description') && this.image) {
                  this.image.required = true;
                }

                return false;
            },
            message: 'You should enter description or image'
        }

    },
    image: {
        type: String,
        validate: {
            validator: async function (value)  {
                if (!this.isModified('image') && this.description) {
                    this.description.required = true;
                    return true
                }
                return false;
            },
            message: 'You should enter description or image'
        }
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;