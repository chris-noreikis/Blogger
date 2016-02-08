import React, { Component, PropTypes } from 'react'
import BlogPost from '../components/blogpost'
import Reblog from '../components/reblogpost'
import * as BlogActions from '../actions'
import { Router, Route, Link, browserHistory } from 'react-router'

const BlogList = (props) => {

  const sorted_blogs_reblogs = props.blog_posts.reduce((prevVal, blog, index, array) => {

      return prevVal.concat(blog.reblogs.map((reblog) => {
          return Object.assign({}, reblog, {
              blog_id: array[index].blog_id
          }, {
              blog_title: array[index].blog_title
          })
      })).concat(array[index]);


  }, []).sort((a,b) => {
    const time1 = a.reblog_time || a.blog_time;
    const time2 = b.reblog_time || b.blog_time;
    return time1 < time2;
  });

  let blogs_reblogs = [];

  var markup = sorted_blogs_reblogs.map((blogPost, index) => {
    if (blogPost.reblog_time) {   
      blogs_reblogs.push(<Reblog key={index} reblog={blogPost} onBlogClick={props.onBlogClick} blog_id={blogPost.blog_id}/>)
    } else if (blogPost.blog_time) {
      blogs_reblogs.push(
        <BlogPost key={index} blog={blogPost} 
        onCommentAdd={props.onCommentAdd} onReblogClick={props.onReblogClick}/>
      )
    }
  })

   return <div className="col-md-9 col-md-offset-2"> {blogs_reblogs} </div>
};

export default BlogList