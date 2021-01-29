'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb+srv://ronyshchenko:test@cluster0.gmarx.mongodb.net/todos');

var todo = new _2.default({
    id: 1,
    label: 'Learning react.js',
    done: false
});

todo.save().then(function () {
    console.log('Ok!');
});

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


// app.get('/posts', function(req, res) {
//     return res.send(posts);
// });

// app.get('/posts/:id', function(req, res) {
//     const id = req.params.id;
//     return res.send(posts[id]);
// });

// app.post('/posts', function(req, res) {
//     const data = req.body;
//     console.log(data);
//     posts.push(data);
//     return res.send(posts);
// });

// app.listen(3000, () => {
//     console.log('srver started on port 3000!')
// })