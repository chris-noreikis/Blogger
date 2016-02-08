 import React, { PropTypes, Component } from 'react'
 import marked from 'marked';

 class NewBlog extends Component {
    constructor(props) {
      super(props);
      this.state = {blogText: ''};
    }
    handleBlogTextChange(e) {
      this.setState({blogText: e.target.value});
    }
    getMarkdown(){
    var rawMarkup = marked(this.state.blogText);
    return {__html: rawMarkup};
    }
    italicClicked() {
      this.setState({blogText: this.state.blogText + "*italics*"})
    }
    boldClicked() {
      this.setState({blogText: this.state.blogText + "**bold**"})
    }
    listClicked() {
      this.setState({blogText: this.state.blogText + "italics*"})
    }
    codeClicked() {
      this.setState({blogText: this.state.blogText + "`<p> Hello world! </p>`"})
    }
    imageClicked(){
      this.setState({blogText: this.state.blogText + "*italics*"})
    }
    blogAdd(title, name) {
       this.props.onBlogAdded(this.state.blogText, title.value, name.value, Date.now() );
    }
   render() {

     let name,
          title,
          blogText = this.state.blogText;

     return (
      <div className="col-md-12">
      <div className="row">
      <div className="col-md-6">
      <form className="form">
      <fieldset className="form-group">
        <label htmlFor="blog-name">Blog Title</label>
        <input type="text" className="form-control" placeholder="Blog Title" id="blog-name" ref={node => title = node}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="blog-name">Name</label>
          <input type="text" className="form-control" placeholder="Name" id="blog-name" ref={node => name = node}/>
          </fieldset>
        <fieldset className="form-group">
          <label htmlFor="blog-text">Blog Content</label>
          <div className="blog-controls">
          <i className="fa fa-italic needs-click" onClick={this.italicClicked.bind(this)} ></i>
          <i className="fa fa-bold needs-click" onClick={this.boldClicked.bind(this)}></i>
          <i className="fa fa-file-image-o needs-click" onClick={this.imageClicked.bind(this)}></i> 
          <i className="fa fa-list-ul needs-click" onClick={this.listClicked.bind(this)}></i>
          <i className="fa fa-code needs-click" onClick={this.codeClicked.bind(this)}></i>
          </div>
          <textarea type="text" className="form-control" placeholder="Blog" id="blog-text" rows="8" onChange={this.handleBlogTextChange.bind(this)} value={blogText}></textarea>
        </fieldset>
        <button type="button" className="btn btn-default" onClick={() => {this.blogAdd(name, title, blogText)}}>Submit</button>
       </form>
       </div>
       <div className="col-md-6">
       <form className="form">
         <fieldset className="form-group">
          <legend> Live Preview </legend>
          <div dangerouslySetInnerHTML={this.getMarkdown.bind(this)()}></div>
         </fieldset>
        </form>
       </div>
       </div>
       </div>
     )
   }
 }

 export default NewBlog


