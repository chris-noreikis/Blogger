import React, { PropTypes, Component } from 'react'

class NewReblog extends Component {
   constructor(props) {
     super(props);
     this.state = {showNameField: false};
   }
   click() {
      this.setState({showNameField: !this.state.showNameField});
   }
   reblogClick(name, form, blog_id, event) {
    event.preventDefault();

    if (form.checkValidity()) {
      this.props.onReblogClick(name, Date.now(), this.props.blog_id)
    }
   }
  render() {
    let name, form
    return (
      <div>
        <span> <i className="fa fa-retweet needs-click right" onClick={this.click.bind(this)}></i> </span> 
        {this.state.showNameField ? (
          <form ref={node => form = node} 
          onSubmit={(e) => {this.reblogClick(name.value, form, this.props.blog_id, e)}}>
        <div className="input-group reblog-section">
          <input type="text" className="form-control" placeholder="Name" ref={node => name = node} required/>
          <span className="input-group-btn">
          <button type="submit" className="btn btn-default">Reblog</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.click.bind(this)}>Cancel</button>
          </span>
        </div> </form>) : null }
      </div>
    )
  }
}

export default NewReblog