import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import Header from '../components/header'
import BlogPost from '../components/blogpost'
import Reblog from '../components/reblogpost'
import BlogList from '../components/bloglist'
import NewBlog from '../components/newblog'
import { routeActions } from 'react-router-redux'
import * as BlogActions from '../actions'
import { Router, Route, Link, browserHistory } from 'react-router'


const App = (props) => {
    const { blog_posts, actions, location } = props
    return (
      <div>
        <Header onNewBlogClick={() => actions.push('/newblog')}/>
        <div className="container">
            <div className="row">
                  <BlogList blog_posts={blog_posts} onCommentAdd={actions.addComment} onReblogClick={actions.reblogBlog}
                    onBlogClick={(blog_id) => actions.push('/' + blog_id)}/>
            </div>
        </div>
      </div>
    )
};

const AddBlog = (props) => {
  const { blog_posts, actions, location } = props
  return (
    <div>
      <Header onBackClick={() => actions.push('/')}/>
      <div className="container">
          <div className="row">
          <NewBlog onBlogAdded={(blog_body, blog_title, blog_poster, blog_time) =>
                                 {actions.addBlog(blog_body, blog_title, blog_poster, blog_time);actions.push('/')}}/>
          </div>
      </div>
    </div>
  )
};

const BlogDetails = (props) => {
  const { blog_posts, actions, location, blog_id } = props
  const blogPost = (blog_posts.filter((x) => {
    return x.blog_id == blog_id
  }))[0]
  return (
    <div>
      <Header onBackClick={() => actions.push('/')}/>
      <div className="container">
          <div className="row">
            {blogPost ? <BlogPost blog={blogPost} 
            onCommentAdd={actions.addComment} onReblogClick={actions.reblogBlog}/> : null }
          </div>
      </div>
    </div>
  )
};

function mapStateToProps(state, ownProps) {
  return {
    blog_posts: state,
    location: ownProps.location.pathname,
    blog_id: ownProps.params.blog_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, BlogActions, routeActions), dispatch)
  }
}

const AppView = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

const NewBlogView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlog)

const BlogDetailsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetails)

module.exports = { NewBlogView, AppView, BlogDetailsView };