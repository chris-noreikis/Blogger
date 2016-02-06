import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import Header from '../components/header'
import BlogPost from '../components/blogpost'
import * as BlogActions from '../actions'

class App extends Component {
  render() {
    console.debug(this.props);
    const { blog_posts, dispatch, reblogs } = this.props
    return (
      <div>
        <Header />
        <div className="row">
          {blog_posts.map(blogPost => <BlogPost />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    blog_posts: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BlogActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)