import React, { PropTypes, Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className="header text-center">
          <div className="container">
              <i id="add-blog-icon" className="fa fa-plus medium-icon needs-click" onClick={this.props.onNewBlogClick}></i>
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