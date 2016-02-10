'use strict';

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var port = 80;
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/newblog', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:blogid', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);


var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
autoIncrement.initialize(mongoose.connection);

db.once('open', function(err, msg) {
    // for testing
   // mongoose.connection.db.dropDatabase();
});

var blogSchema = mongoose.Schema({
    blog_id: Number,
    blog_body: String,
    blog_title: String,
    blog_poster: String,
    blog_time: Number,
    blog_comments: Array,
    reblogs: Array
});

blogSchema.plugin(autoIncrement.plugin, {
    model: 'Blog',
    field: 'blog_id'
});

var Blog = mongoose.model('Blog', blogSchema);

Blog.find(function(err, blogs) {});


io.on('connection', function(socket) {

    Blog.find(function(err, blogs) {
        socket.emit('stateTree', blogs);
    });

    socket.on('blogAdded', function(data) {
        var blog = new Blog({
            blog_body: data.blog_body,
            blog_title: data.blog_title,
            blog_poster: data.blog_poster,
            blog_time: data.blog_time,
            blog_comments: [],
            reblogs: []
        });
        blog.save(function(err, blog) {
            Blog.find(function(err, blogs) {
                socket.broadcast.emit('stateTree', blogs);
            });
        });
    });

    socket.on('commentAdded', function(data) {
        Blog.findOne({
            'blog_id': data.blog_id
        }, function(err, blog) {
            blog.blog_comments.push({
                comment_poster: data.comment_poster,
                comment_body: data.comment_body,
                comment_time: Date.now()
            });
            blog.save(function(err, blog) {
                Blog.find(function(err, blogs) {
                    socket.broadcast.emit('stateTree', blogs);
                });
            });
        });
    });

    socket.on('reblogAdded', function(data) {
        Blog.findOne({
            'blog_id': data.blog_id
        }, function(err, blog) {
            blog.reblogs.push({
                blog_poster: data.blog_poster,
                reblog_time: data.reblog_time
            });
            blog.save(function(err, blog) {
                Blog.find(function(err, blogs) {
                    socket.broadcast.emit('stateTree', blogs);
                });
            });
        });
    });
});
