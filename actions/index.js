import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG, STATE_RECEIVED } from '../constants/actiontypes'
import { SOCKET_URL } from '../constants/utility'
const io = require('socket.io-client')
const socket = io.connect(SOCKET_URL);

// The optimistic functions below are used for error handling with React-Thunk
// React-Thunk lets allows code to dispatch a function call instead of an object,
// giving functions closure over the dispatch method to call it later on

export function addBlogOptimistic(blog_body, blog_title, blog_poster, blog_time) {
    return {
        type: ADD_BLOG,
        blog_title,
        blog_poster,
        blog_body,
        blog_time
    }
}

export function addBlog(blog_body, blog_title, blog_poster, blog_time) {
  return function(dispatch) {
    dispatch(addBlogOptimistic(blog_body, blog_title, blog_poster, blog_time));

    socket.emit('blogAdded', {blog_body, blog_title, blog_poster, blog_time}, (error, message) => {
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
        //TODO: remove comment
    })
  }
}

export function reblogBlogOptimistic(blog_poster, reblog_time, blog_id) {
    return {
        type: REBLOG_BLOG,
        blog_poster,
        reblog_time,
        blog_id
    }
}

export function reblogBlog(blog_poster, reblog_time, blog_id) {
  return function(dispatch) {
    dispatch(reblogBlogOptimistic(blog_poster, reblog_time, blog_id));

    socket.emit('reblogAdded', {blog_poster, reblog_time, blog_id}, function (error, message) {
        // TODO:  remove reblog
    })
  }
}