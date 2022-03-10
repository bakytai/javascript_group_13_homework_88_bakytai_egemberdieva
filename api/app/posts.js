const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');
const config = require('../config');
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

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title are required'});
        }

        if (!req.body.description && !req.body.image) {
            return res.status(400).send({message: 'Please enter description or Load a picture'});
        }

        const newDate = new Date().toISOString();

        const postData = {
            user: req.body.user,
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

        return res.send({message: 'Created new product', id: post._id});
    } catch (e) {
        next(e);
    }
});
