import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="header text-center">
          <div className="container">
              {this.props.onNewBlogClick ?<i id="add-blog-icon" className="fa fa-plus medium-icon needs-click" onClick={this.props.onNewBlogClick}></i>: null}
              {this.props.onBackClick ?<i id="back-icon" className="fa fa-arrow-left medium-icon needs-click" onClick={this.props.onBackClick}></i>: null}
              <i className="fa fa-rss large-icon"></i>
              <h1> blog with friends </h1>
              <hr className="small-hr"/>
              <i> collaboration & innovation for your network </i>
          </div>
      </div>
    )
  }
}

export default Header