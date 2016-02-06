
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const initialStateTest = [{
        blog_id: -2,
        blog_body: 'Create a sample blog',
        blog_title: 'Blog with friends is great!',
        blog_poster: 'Jim',
        blog_date: 1454633060055,
        blog_comments: [],
        reblogs: [],
    }, {
        blog_id: -1,
        blog_body: 'I can make a blog too using this site!',
        blog_title: 'I love blog with friends',
        blog_poster: 'Randy',
        blog_date: 1454633030040,
        blog_comments: [],
        reblogs: []
    }];

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

io.on('connection', function (socket) {
  socket.emit('stateTree', initialStateTest);

  socket.on('blogAdded', function (data) {
    
  });

  socket.on('commentAdded', function (data) {
    
  });

  socket.on('reblogAdded', function (data) {
    
  });

});