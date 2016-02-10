import React, { PropTypes, Component } from 'react'
import CommentList from './commentlist'
import AddComment from './newcomment'

class CommentSection extends Component {
   constructor(props) {
     super(props);
     this.state = {showComments: false};
   }
   click() {
      this.setState({showComments: !this.state.showComments});
   }
  render() {
    return (
      <div className="comment-section">
          <btn className="needs-click" onClick={this.click.bind(this)}>
                 {this.props.comments.length}  <i className="fa fa-comments"></i> 
          </btn>
      { this.state.showComments ? <CommentList comments={this.props.comments}/>  : null}
      { this.state.showComments ? <AddComment blog_id={this.props.blog_id} onCommentAdd={this.props.onCommentAdd}/> : null}
      </div>
    )
  }
}

export default CommentSection