const express = require('express');
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser');
require('./src/db');

const Schema = mongoose.Schema;

const app = express();

const port = process.env.PORT || 80;
  
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(`
    Документация по REST API

    Получение вкладки постов (метод: get):/api/posts/list/?numberTab=номер вкладки
Получение поста по id (метод get): /api/posts/:id
Создание поста (метод post): /api/posts/create/
Удаление поста (метод delete): /api/posts/delete/:id
Корректировка поста (метод put): /api/posts/update/:id`);
});

app.get('/api/posts/list/', (req, res) => {
    const countInTab = 10;
    let skip = +req.query.numberTab*countInTab;
    
    Posts.find().limit(countInTab).skip(skip).then((err, posts) => {
        if(err) {
            res.send(err);
        } else res.json(posts);
    });
});

app.get('/api/posts/:id', (req, res) =>{
    const id = req.params.id;
    Posts.findById(id).then((err, post) => {
        if(err) {
            res.send(err);
        } else res.json(post);
    });
});

app.post('/api/posts/create/', (req, res) => {

    let errorArr =[];

    function validateEmail(email) 
    {
        var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        return re.test(email);
    }

    function validateStringEmpty(str) 
    {
        var re = /^[ \t\n]*$/i;
        return re.test(str);
    }
    const data = req.body;
    
    if (!validateEmail(data.email)) {
        errorArr.push('Enter correct email');
    }

    if (validateStringEmpty(data.post)) {
        errorArr.push('Enter not empty message');
    }

    if (data.post.length<100) {
        errorArr.push('Length of message < 100');
    }

    if (errorArr.length > 0) {
        return res.status(422).json({ errorArr });
    }

    const post = new Posts ({
        post: data.post,
        email: data.email
    });

    post.save().then(() => {
        res.send({ status: 'ok' });
    });
});

app.delete('/api/posts/delete/:id', (req, res) => {
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

app.put('/api/posts/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, {$set: req.body}, err  => {
        if(err) {
            res.send(err);
        } else {
            res.json({ status: 'updated' });
        }
    });
});

app.listen((process.env.PORT || 8080), () => {
    console.log('server started on port 8080')
});