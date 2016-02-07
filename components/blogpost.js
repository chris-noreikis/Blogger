import React, { PropTypes, Component } from 'react'
import CommentSection from './commentsection'
import NewReblog from './newreblog'

class BlogPost extends Component {
  render() {
    return (
      <div href="post">
          <h1 className="title">
              {this.props.blog.blog_title}
              <NewReblog onReblogClick={this.props.onReblogClick} blog_id={this.props.blog.blog_id}/>
          </h1>
          <div className="author">
              Posted by {this.props.blog.blog_poster} on <i> {this.props.blog.blog_date} </i>
          </div>
          <hr className="small-hr" align="left"/>
          <div className="post-body">
          # Generis minuitque a foedere abiit
          ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
          ## Nec etiam prohibent renarrant cthonius licet caute

          Lorem markdownum iaces satis dubiam nec adfectu latos. Mensis causam utque cuius
          a simus, quem caput, nam undique frater illa, tegi cava audit et. Risus tempore
          Mulciber perquirere; iustis animi carne caelum, *et* visi, erat onus prodigio
          Cadme. [Exstat an madidum](http://html9responsiveboilerstrapjs.com/) mentita;
          que potitus, sic qua obstet vae alumnae illos adiere cumque relictis. Ad
          [rector](http://www.billmays.net/)?

          ## Fortuna modo

          Nec resuscitat perdes, in et scite collaque. Ausum mihi bis, **clausit** chaos
          me penthea fatur promissaque tamen. Ossa alto, dare *tenus frustra supponitur*
          replet equique genitus. Querentes sonantem per ipse; mutatis dolor *et Atrides
          arbor*.
          </div>
          <CommentSection blog_id={this.props.blog.blog_id} comments={this.props.blog.blog_comments} reblogs={this.props.blog.reblogs} 
          onCommentAdd={this.props.onCommentAdd}/>
          <hr />
      </div>
    )
  }
}

export default BlogPost