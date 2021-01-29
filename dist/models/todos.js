'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    id: Number,
    label: String,
    done: Boolean
}, {
    timestamps: true
});

var Todo = mongoose.model('Todos', TodoSchema);