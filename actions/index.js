import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'

export function addBlog(blog_body, blog_title, blog_poster, blog_time) {
    return {
        type: ADD_BLOG,
        blog_title,
        blog_poster,
        blog_body,
        blog_time
    }
}

export function addComment(comment_poster, comment_body, comment_time, blog_id) {
    return {
        type: ADD_COMMENT,
        comment_poster,
        comment_time,
        comment_body,
        blog_id
    }
}

export function reblogBlog(blog_poster, reblog_time, blog_id) {
    return {
        type: REBLOG_BLOG,
        blog_poster,
        reblog_time,
        blog_id
    }
}
