import React, { PropTypes, Component } from 'react'

const CommentList = (props) => {
   var renderedComments = props.comments.map((comment, index) => 
      <div className="comments" key={index}>
          <div className="comment">
              <div className="comment">
                  {comment.comment_body}
              </div>
              <div className="comment-author">
                  <i> {comment.comment_date} </i> <b> {comment.comment_poster} </b> 
              </div>
          </div>
      </div>
   )
   return <div> {renderedComments} </div>
};

export default CommentList