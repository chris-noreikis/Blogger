import React, { PropTypes, Component } from 'react'

class NewReblog extends Component {
   constructor(props) {
     super(props);
     this.state = {showNameField: false};
   }
   click() {
      this.setState({showNameField: !this.state.showNameField});
   }
  render() {
    let name
    return (
      <div>
        <span> <i className="fa fa-retweet needs-click right" onClick={this.click.bind(this)}></i> </span> 
        {this.state.showNameField ? (
        <div className="input-group reblog-section">
          <input type="text" className="form-control" placeholder="Name" ref={node => name = node}/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={() => {this.props.onReblogClick(name.value, Date.now(), this.props.blog_id)}}>Reblog</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.click.bind(this)}>Cancel</button>
          </span>
        </div>) : null }
      </div>
    )
  }
}

export default NewReblog