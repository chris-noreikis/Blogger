import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'
import { SOCKET_URL } from '../constants/utility'
const io = require('socket.io-client')
const socket = io.connect(SOCKET_URL);

export function addBlogOptimistic(blog_body, blog_title, blog_poster, blog_time) {
    return {
        type: ADD_BLOG,
        blog_title,
        blog_poster,
        blog_body,
        blog_time
    }
}

export function addBlog(...args) {

  return function(dispatch) {
    dispatch(addBlogOptimistic(...args));

    socket.emit('blogAdded', args, (error) => (message) => {
        // TODO: remove added blog
        throw new Error("Failed to add blog");
    })
  }
}

export function addCommentOptimistic(comment_poster, comment_body, comment_time, blog_id) {
    return {
        type: ADD_COMMENT,
        comment_poster,
        comment_time,
        comment_body,
        blog_id
    }
}

export function addComment(comment_poster, comment_body, comment_time, blog_id) {
  return function(dispatch) {
    
    dispatch(addCommentOptimistic(comment_poster, comment_body, comment_time, blog_id));
    socket.emit('commentAdded', {comment_poster, comment_body, comment_time, blog_id}, function (error, message) {
        console.log(dispatch);
    })
  }
}

export function reblogBlogOptimistic(blog_poster, reblog_time, blog_id) {
    console.debug(blog_poster);
    console.debug(reblog_time);
    console.debug(blog_id);
    return {
        type: REBLOG_BLOG,
        blog_poster,
        reblog_time,
        blog_id
    }
}

export function reblogBlog(...args) {
    console.debug(arguments);
  return function(dispatch) {
    dispatch(reblogBlogOptimistic(...args));

    socket.emit('reblogAdded', args, function (error, message) {
        // TODO: remove added reblog
        console.log(dispatch);
    })
  }
}