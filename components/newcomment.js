
import React, { PropTypes, Component } from 'react'

class AddComment extends Component {
   constructor(props) {
     super(props);
   }
   commentAdd(name, comment, form, event) {
     event.preventDefault();

     if (form.checkValidity()) {
      let nameVal = name.value,
           commentVal = comment.value;

      name.value = '';
      comment.value = '';
      this.props.onCommentAdd(nameVal, commentVal, Date.now(), this.props.blog_id );
     }
   }
  render() {

   let name, comment, blog_id = this.props.blog_id, form

    return (
      <form ref={node => form = node} onSubmit={(event) => {this.commentAdd(name, comment, form, event)}}>
        <fieldset className="form-group">
          <input type="text" className="form-control" placeholder="Name" ref={node => name = node} required/>
        </fieldset>
        <fieldset className="form-group">
          <textarea type="text" className="form-control" placeholder="Comment" ref={node => comment = node} required></textarea>
        </fieldset>
        <button type="submit" className="btn btn-default">Submit</button>
       </form>
    )
  }
}

export default AddComment