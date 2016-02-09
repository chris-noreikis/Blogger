import React, { PropTypes, Component } from 'react'
import { getFormattedDate } from '../utility/'

const Reblog = (props) => {
      return (
          <div href="post">
            <h1> {props.reblog.blog_poster} reblogged <a onClick={() => {props.onBlogClick(props.blog_id)}}> <i> {props.reblog.blog_title} </i> </a> </h1> 
            <span> {getFormattedDate(props.reblog.reblog_time)} </span>
            <hr />
          </div>
        )
};

export default Reblog