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
    const { blogPosts, dispatch, reblogs } = this.props
    return (
      <div className="container">
        <Header />
        <div className="row">
          {blogPosts.map(blogPost => <BlogPost />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    blogPosts: state.blogger.blogPosts,
    reblogs: state.blogger.reblogs
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