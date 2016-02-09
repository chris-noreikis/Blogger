
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
autoIncrement.initialize(mongoose.connection);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //mongoose.connection.db.dropDatabase();
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

blogSchema.plugin(autoIncrement.plugin, { model: 'Blog', field: 'blog_id' });

var Blog = mongoose.model('Blog', blogSchema);

var blog = new Blog({
            blog_body: 'Create a sample blog',
            blog_title: 'Blog with friends is great!',
            blog_poster: 'Jim',
            blog_time: 1454633060055,
            blog_comments: [                        {comment_poster: 'Comment poster',
                        comment_body: 'This blog rocks!',
                         comment_time: Date.now()}],
            reblogs: [],
})

blog.save();

const port = 8080
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));

server.listen(port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/newblog', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/:blogid', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})


Blog.find((err, blogs) => {

 })

io.on('connection', function(socket) {

    Blog.find((err, blogs) => {
        socket.emit('stateTree', blogs);      
     })

    socket.on('blogAdded', function(data) {
      var blog = new Blog({
                  blog_body: data.blog_body,
                  blog_title: data.blog_title,
                  blog_poster: data.blog_poster,
                  blog_time: data.blog_time,
                  blog_comments: [],
                  reblogs: []
      })
      blog.save();

      Blog.find((err, blogs) => {
          socket.broadcast.emit('stateTree', blogs);      
       })
    });

    socket.on('commentAdded', function(data) {
        Blog.findOne({ 'blog_id': data.blog_id }, function (err, blog) {
          if (err) console.log(err);
          blog.blog_comments.push({
             comment_poster: data.comment_poster,
             comment_body: data.comment_body,
             comment_time: Date.now()
          })
          blog.save();
        });

        Blog.find((err, blogs) => {
            socket.broadcast.emit('stateTree', blogs);      
         })
    });

    socket.on('reblogAdded', function(data) {
        Blog.findOne({ 'blog_id': data.blog_id }, function (err, blog) {
          if (err) console.log(err);
          blog.reblogs.push({
             blog_poster: data.blog_poster,
             reblog_time: data.reblog_time
          })
          blog.save();
        });

        Blog.find((err, blogs) => {
            socket.broadcast.emit('stateTree', blogs);      
         })
    });

});



    // console.log(blogs[2].blog_comments.push({
    //                     comment_poster: 'Comment poster',
    //                     comment_body: 'This blog rocks!',
    //                     comment_time: Date.now()
    //                 }))
    // blogs[2].save();

    // console.log(blogs[2].reblogs.push({
    //                     blog_poster: 'Comment poster',
    //                     reblog_time: Date.now()
    //                 }))
    // blogs[2].save();

    // var blog = new Blog({
    //             blog_body: 'Create a sample blog',
    //             blog_title: 'Blog with friends is great!',
    //             blog_poster: 'Jim',
    //             blog_time: 1454633060055,
    //             blog_comments: [                        {comment_poster: 'Comment poster',
    //                         comment_body: 'This blog rocks!',
    //                          comment_time: Date.now()}],
    //             reblogs: [],
    // })