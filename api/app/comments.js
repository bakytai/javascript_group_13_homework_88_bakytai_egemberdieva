const express = require('express');
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
    try {
        if (!req.body.text) {
            return res.status(400).send({message: 'Text are required'});
        }

        const commentData = req.body;
        commentData.user = req.user._id;

        const comment = new Comment(commentData);

        await comment.save();

        return res.send({message: 'Created new post', id: post._id});
    } catch (e) {
        next(e);
    }
});