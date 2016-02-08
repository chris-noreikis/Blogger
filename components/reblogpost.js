import React, { PropTypes, Component } from 'react'

const Reblog = (props) => {
      return (
          <div href="post">
            <h2> {props.reblog.blog_poster} reblogged <a onClick={() => {props.onBlogClick(props.blog_id)}}> <i> {props.reblog.blog_title} </i> </a> </h2> 
            <span> {props.reblog.reblog_time} </span>
            <hr />
          </div>
        )
};

export default Reblog