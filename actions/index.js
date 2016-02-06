import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'

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

export function addComment(...args) {

  return function(dispatch) {
    dispatch(addCommentOptimistic(...args));

    socket.emit('commentAdded', args, function (error, message) {
        // TODO: remove added comment
        console.log(dispatch);
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

export function reblogBlog(...args) {

  return function(dispatch) {
    dispatch(reblogBlogOptimistic(...args));

    socket.emit('reblogAdded', args, function (error, message) {
        // TODO: remove added reblog
        console.log(dispatch);
    })
  }
}