const express = require('express');
const auth = require("../middleware/auth");
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const query = {};

        if (req.query.post) {
            query.post = req.query.post;
        }

        const comments = await Comment.find(query).populate("user", "displayName");

        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        if (!req.body.text) {
            return res.status(400).send({message: 'Text are required'});
        }

        const commentData = {
            text: req.body.text,
            post: req.body.post,
            user: req.user._id,
        };


        const comment = new Comment(commentData);

        await comment.save();

        return res.send(comment);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
