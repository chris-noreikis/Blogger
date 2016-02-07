import 'babel-polyfill'
import { createStore } from 'redux'
import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'
import { BLOG_ID, BLOG_TITLE, BLOG_POSTER, BLOG_BODY, BLOG_TIME } from '../constants/blogpost'

function blog(state, action) {
    switch (action.type) {
        case ADD_BLOG:
            return {
                blog_id: action[BLOG_ID],
                blog_body: action[BLOG_BODY],
                blog_title: action[BLOG_TITLE],
                blog_poster: action[BLOG_POSTER],
                blog_time: action[BLOG_TIME],
                blog_comments: [],
                reblogs: []
            };
        case ADD_COMMENT:
            if (state.blog_id !== action.blog_id) {
                return state
            }

            return Object.assign({}, state, {
                blog_comments: state.blog_comments.concat({
                    comment_poster: action.comment_poster,
                    comment_time: action.comment_time,
                    comment_body: action.comment_body
                })
            });
        case REBLOG_BLOG:
            if (state.blog_id !== action.blog_id) {
                return state
            }

            return Object.assign({}, state, {
                reblogs: state.reblogs.concat({
                    blog_poster: action.blog_poster,
                    reblog_time: action.reblog_time
                })
            });

        default:
            return state
    }
}

export default function blogs(state = [], action) {
    
    switch (action.type) {
        case ADD_BLOG:
            action[BLOG_ID] = state.reduce((maxId, blog) => Math.max(blog[BLOG_ID], maxId), -1) + 1;

            return [...state,
                blog(undefined, action)
            ];


        case ADD_COMMENT:
            return state.map(b =>
                blog(b, action)
            )

        case REBLOG_BLOG:
            return state.map(b =>
                blog(b, action)
            )

        default:
            return state
    }
}
