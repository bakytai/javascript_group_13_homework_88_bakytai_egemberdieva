const mongoose = require('mongoose');
const config = require('./config');
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [boke, oleg] = await User.create({
        email: 'bakijw@gmail.com',
        displayName: 'boke',
        password: '1234',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'olegjw@gmail.com',
        displayName: 'oleg',
        password: '123',
        token: '8enDI2paOqusBavVWOnwL'
    });

    const [post1, post2] =  await Post.create({
        user: boke,
        date: '2022-03-12T03:43:48.976Z',
        title: 'good news',
        description: 'news about war of Ukraine',
    }, {
        user: oleg,
        date: '2022-03-12T03:44:40.013Z',
        title: 'Weather',
        description: 'long description',
        image: '0jtmLZ7G6vYy8MZX_FO6H.png'
    });

    await Comment.create({
        user: boke,
        post: post2,
        text: 'some text'
    }, {
        user: oleg,
        post: post1,
        text: 'random words'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));