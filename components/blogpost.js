import React, { PropTypes, Component } from 'react'
import CommentSection from './commentsection'
import NewReblog from './newreblog'

class BlogPost extends Component {
  render() {
    return (
      <div href="post">
          <h1 className="title">
              {this.props.blog.blog_title}
              <NewReblog onReblogClick={this.props.onReblogClick} blog_id={this.props.blog.blog_id}/>
          </h1>
          <div className="author">
              Posted by {this.props.blog.blog_poster} on <i> {this.props.blog.blog_time} </i>
          </div>
          <hr className="small-hr" align="left"/>
          <div className="post-body">
            {this.props.blog.blog_body}
          </div>
          <CommentSection blog_id={this.props.blog.blog_id} comments={this.props.blog.blog_comments} reblogs={this.props.blog.reblogs} 
          onCommentAdd={this.props.onCommentAdd}/>
          <hr />
      </div>
    )
  }
}

export default BlogPost