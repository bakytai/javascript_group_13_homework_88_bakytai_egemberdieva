const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');
const config = require('../config');
const auth = require("../middleware/auth");
const Post = require('../models/Post');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate("user", "displayName");

        return res.send(posts);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const postInfo = await Post.findById(req.params.id).populate("user", "displayName token");

        return res.send(postInfo);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title are required'});
        }

        if (!req.body.description && !req.body.image) {
            return res.status(400).send({message: 'Please enter description or Load a picture'});
        }

        const newDate = new Date().toISOString();

        const postData = {
            user: req.user._id,
            date: newDate,
            title: req.body.title,
            description: req.body.description,
            image: null,
        };

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);

        await post.save();

        return res.send(post);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
