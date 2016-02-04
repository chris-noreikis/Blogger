import { createStore } from 'redux'
import { ADD_BLOG, ADD_COMMENT_BLOG, REBLOG_BLOG } from '../constants/actiontypes'
import { BLOG_ID, BLOG_TITLE, BLOG_POSTER, BLOG_BODY } from '../constants/blogpost'

var initialState = {
    blogPosts: [{
        blog_id: 0,
        blog_body: 'Create a sample blog',
        blog_title: 'Blog with friends is great!',
        blog_poster: 'Jim',
        blog_comments: []
    }, {
        blog_id: 1,
        blody_body: 'I can make a blog too using this site!',
        blog_title: 'I love blog with friends',
        blog_poster: 'Randy',
        blog_comments: [{
            comment_title: 'Stupid',
            comment_body: 'Can\'t believe I read this',
            comment_name: 'Randy'
        }]
    }],
    reblogs: [{
        blog_poster: 'Randy',
        blog_id: 0
    }, {
        blog_poster: 'Jim',
        blog_id: '1'
    }]
}

export default function blogs(state = initialState, action) {
    switch (action.type) {
        case ADD_BLOG:
            return {
                blogPosts: [{
                        blog_id: state.blogPosts.reduce((maxId, blog) => Math.max(blog[BLOG_ID], maxId), -1) + 1,
                        blod_body: action[BLOG_BODY],
                        blog_title: action[BLOG_TITLE],
                        blog_poster: action[BLOG_POSTER]
                    },
                    ...state.blogPosts
                ],
                reblogs: state.reblogs
            }

        case ADD_COMMENT_BLOG:
            return state

        case REBLOG_BLOG:
            return state

        default:
            return state
    }
}
