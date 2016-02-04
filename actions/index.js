import { ADD_BLOG, ADD_COMMENT_BLOG, REBLOG_BLOG } from '../constants/actiontypes'

export function addBlog(body, title, poster) {
  return { type: types.ADD_BLOG, blog_title: title, blog_poster: poster, blog_body: body }
}