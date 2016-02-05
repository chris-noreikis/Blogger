import expect from 'expect'
import blogs from '../reducers/blogger'
import { ADD_BLOG, ADD_COMMENT, REBLOG_BLOG } from '../constants/actiontypes'

describe('blog reducer', () => {
    it('should handle initial state', () => {
        expect(
            blogs(undefined, {})
        ).toEqual([])
    })

    it('should handle ADD_BLOG', () => {

        let creationTime = Date.now();
        let expectedFirstState = [{
            blog_id: 0,
            blog_body: 'Blog body',
            blog_title: 'Blog title',
            blog_poster: 'Blog poster',
            blog_time: creationTime,
            "blog_comments": [],
            "reblogs": []
        }];

        expect(
            blogs(undefined, {
                type: ADD_BLOG,
                blog_body: 'Blog body',
                blog_title: 'Blog title',
                blog_poster: 'Blog poster',
                blog_time: creationTime
            })
        ).toEqual(expectedFirstState)

        let creationTime_2 = Date.now();

        expect(
            blogs(expectedFirstState, {
                type: ADD_BLOG,
                blog_body: 'Blog body_2',
                blog_title: 'Blog title_2',
                blog_poster: 'Blog poster_2',
                blog_time: creationTime_2
            })
        ).toEqual(
            [{
                blog_id: 0,
                blog_body: 'Blog body',
                blog_title: 'Blog title',
                blog_poster: 'Blog poster',
                "blog_comments": [],
                "reblogs": [],
                blog_time: creationTime
            }, {
                blog_id: 1,
                blog_body: 'Blog body_2',
                blog_title: 'Blog title_2',
                blog_poster: 'Blog poster_2',
                "blog_comments": [],
                "reblogs": [],
                blog_time: creationTime_2
            }]
        )

    })

    it('should handle ADD_COMMENT', () => {
        const creationTime = Date.now();
        const initialState = [{
            blog_id: 0,
            blog_body: 'Blog body',
            blog_title: 'Blog title',
            blog_poster: 'Blog poster',
            blog_time: creationTime,
            "blog_comments": [],
            "reblogs": []
        }];

        expect(
            blogs(initialState, {
                type: ADD_COMMENT,
                comment_poster: 'Comment poster',
                comment_body: 'This blog rocks!',
                comment_time: creationTime,
                blog_id: 0
            })
        ).toEqual(
            [{
                blog_id: 0,
                blog_body: 'Blog body',
                blog_title: 'Blog title',
                blog_poster: 'Blog poster',
                "blog_comments": [{
                    comment_poster: 'Comment poster',
                    comment_body: 'This blog rocks!',
                    comment_time: creationTime
                }],
                "reblogs": [],
                blog_time: creationTime
            }])

        const creationTime_2 = Date.now();

        expect(
            blogs(
                [{
                    blog_id: 0,
                    blog_body: 'Blog body',
                    blog_title: 'Blog title',
                    blog_poster: 'Blog poster',
                    "blog_comments": [{
                        comment_poster: 'Comment poster',
                        comment_body: 'This blog rocks!',
                        comment_time: creationTime
                    }],
                    "reblogs": [],
                    blog_time: creationTime
                }], {
                    type: ADD_COMMENT,
                    comment_poster: 'Comment poster_2',
                    comment_body: 'This blog rocks_2',
                    comment_time: creationTime_2,
                    blog_id: 0
                }
            )).toEqual(
            [{
                blog_id: 0,
                blog_body: 'Blog body',
                blog_title: 'Blog title',
                blog_poster: 'Blog poster',
                "blog_comments": [{
                    comment_poster: 'Comment poster',
                    comment_body: 'This blog rocks!',
                    comment_time: creationTime
                }, {
                    comment_poster: 'Comment poster_2',
                    comment_body: 'This blog rocks_2',
                    comment_time: creationTime_2
                }],
                "reblogs": [],
                blog_time: creationTime
            }],
        )

    })

    it('should handle REBLOG_BLOG', () => {
        const creationTime = Date.now();
        const initialState = [{
            blog_id: 0,
            blog_body: 'Blog body',
            blog_title: 'Blog title',
            blog_poster: 'Blog poster',
            blog_time: creationTime,
            "blog_comments": [],
            "reblogs": []
        }];

        expect(
            blogs(initialState, {
                type: REBLOG_BLOG,
                blog_poster: 'Comment poster',
                reblog_time: creationTime,
                blog_id: 0
            })
        ).toEqual(
            [{
                blog_id: 0,
                blog_body: 'Blog body',
                blog_title: 'Blog title',
                blog_poster: 'Blog poster',
                "reblogs": [{
                    blog_poster: 'Comment poster',
                    reblog_time: creationTime
                }],
                "blog_comments": [],
                blog_time: creationTime
            }])
    })
})
