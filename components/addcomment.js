
import React, { PropTypes, Component } from 'react'

class AddComment extends Component {
   constructor(props) {
     super(props);
   }
  render() {

   let name,
        comment,
        blog_id = this.props.blog_id;

    return (
      <form>
        <fieldset className="form-group">
          <input type="text" className="form-control" placeholder="Name" ref={node => name = node} />
        </fieldset>
        <fieldset className="form-group">
          <textarea type="text" className="form-control" placeholder="Comment" ref={node => comment = node}></textarea>
        </fieldset>
        <button type="button" className="btn btn-default" onClick={() => {this.props.onCommentAdd(name.value, comment.value, Date.now(), blog_id )}}>Submit</button>
       </form>
    )
  }
}

export default AddComment