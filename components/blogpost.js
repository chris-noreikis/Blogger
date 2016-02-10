import React, { PropTypes, Component } from 'react'
import CommentSection from './commentsection'
import NewReblog from './newreblog'
import marked from 'marked';
import { getFormattedDate } from '../utility/'

class BlogPost extends Component {
  getMarkdown(){
    var rawMarkup = marked(this.props.blog.blog_body);
    return {__html: rawMarkup};
  }
  render() {
    return (
      <div href="post" className="post">
          <h1 className="title">
              {this.props.blog.blog_title}
              <NewReblog onReblogClick={this.props.onReblogClick} blog_id={this.props.blog.blog_id}/>
          </h1>
          <div className="author">
              Posted by {this.props.blog.blog_poster} on <i> {getFormattedDate(this.props.blog.blog_time)} </i>
          </div>
          <hr align="left"/>
          <div className="post-body" dangerouslySetInnerHTML={this.getMarkdown.bind(this)()}>

          </div>
          <CommentSection blog_id={this.props.blog.blog_id} comments={this.props.blog.blog_comments} reblogs={this.props.blog.reblogs} 
          onCommentAdd={this.props.onCommentAdd}/>
          <hr />
      </div>
    )
  }
}

export default BlogPost