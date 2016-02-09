import expect from 'expect'
import * as actions from '../actions'
import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'

describe('blog actions', () => {

    it('addBlog creates an ADD_BLOG action', () => {
        const creationTime = Date.now();
        expect(actions.addBlogOptimistic('Blog body', 'Blog title', 'Blog poster', creationTime)).toEqual({
            type: ADD_BLOG,
            blog_body: 'Blog body',
            blog_title: 'Blog title',
            blog_poster: 'Blog poster',
            blog_time: creationTime
        })
    })

    it('addComment creates an ADD_COMMENT action', () => {
        const creationTime = Date.now();
        const blog_id = 0;
        expect(actions.addCommentOptimistic('Blog poster', 'Comment body', creationTime, blog_id)).toEqual({
            type: ADD_COMMENT,
            comment_poster: 'Blog poster',
            comment_body: 'Comment body',
            comment_time: creationTime,
            blog_id: blog_id
        })
    })

    it('reblogBlog creates an REBLOG_BLOG action', () => {
        const creationTime = Date.now();
        const blog_id = 0;
        expect(actions.reblogBlogOptimistic('Blog poster', creationTime, blog_id)).toEqual({
            type: REBLOG_BLOG,
            blog_poster: 'Blog poster',
            reblog_time: creationTime,
            blog_id: blog_id
        })
    })

})