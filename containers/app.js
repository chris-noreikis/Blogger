import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import Header from '../components/header'
import BlogPost from '../components/blogpost'
import * as BlogActions from '../actions'
import { Router, Route, Link, browserHistory } from 'react-router'
import { routeActions } from 'react-router-redux'


class App extends Component {
  render() {
    const { blog_posts, actions } = this.props
    const sorted_blogs_reblogs = blog_posts.reduce((prevVal, blog, index, array) => {
        return prevVal.concat(blog.reblogs).concat(array[index]);
    }, []).sort((a,b) => {
      const time1 = a.reblog_time || a.blog_date;
      const time2 = b.reblog_time || b.blog_date;
      return time1 < time2;
    });

    let blogs_reblogs = [];

    sorted_blogs_reblogs.map((blogPost, index) => {
      if (blogPost.reblog_time) {

      } else if (blogPost.blog_date) {
        blogs_reblogs.push(
          <BlogPost key={index} blog={blogPost} 
          onCommentAdd={actions.addComment} onReblogClick={actions.reblogBlog}/>
        )
      }
    })

    return (
      <div>
        <Header onNewBlogClick={() => actions.push('newblog')}/>
        <div className="container">
            <div className="row">
                <div className="col-md-9 col-md-offset-2">
                  {blogs_reblogs}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    blog_posts: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, BlogActions, routeActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)