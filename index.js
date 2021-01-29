const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser');
require('./src/models/db');





const Schema = mongoose.Schema;

const app = express();
  
const PostsScheme = new Schema (
    {
        post: String,
        email: String
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model("Posts", PostsScheme);

//mongoose.connect("mongodb+srv://ronyshchenko:test@cluster0.gmarx.mongodb.net/todos", { useNewUrlParser: true });
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("<h2>Привет Express!</h2>");
});

app.get('/posts/', (req, res) => {
    Posts.find().then((err, posts) => {
        if(err) {
            res.send(err);
        } else res.json(posts);
    });
});

app.get('/posts/:id', (req, res) =>{
    const id = req.params.id;
    Posts.findById(id).then((err, post) => {
        if(err) {
            res.send(err);
        } else res.json(post);
    });
});

app.post('/posts', (req, res) => {
    const data = req.body;
    console.log(data)
    const post = new Posts ({
        post: data.post,
        email: data.email
    });

    post.save().then(() => {
        res.send({ status: 'ok' });
    });
});

app.delete('/posts/:id', (req, res) => {
    Posts.remove({
        _id: req.params.id
    }).then(post => {
        if(post) {
            res.json({ status: 'deleted' });
        } else {
            res.json({ status: 'error' });
        }
    });
});

app.put('/posts/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, {$set: req.body}, err  => {
        if(err) {
            res.send(err);
        } else {
            res.json({ status: 'updated' });
        }
    });
});

app.listen(3001, () => {
    console.log('server started on port 3001')
});