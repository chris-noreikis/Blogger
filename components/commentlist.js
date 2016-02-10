import React, { PropTypes, Component } from 'react'
import { getFormattedDate } from '../utility/'

const CommentList = (props) => {
   var renderedComments = props.comments.map((comment, index) => 
      <div className="comments" key={index}>
          <div className="comment">
              <div className="comment">
                  {comment.comment_body}
              </div>
              <div className="comment-author">
                  <b> {comment.comment_poster} </b> - <i> {getFormattedDate(comment.comment_time)} </i>
              </div>
          </div>
      </div>
   )
   return <div> {renderedComments} </div>
};

export default CommentList