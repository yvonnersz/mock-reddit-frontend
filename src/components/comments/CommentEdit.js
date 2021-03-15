import React from 'react';
import { connect } from 'react-redux';
import { editComment } from '../../actions/comment/editComment';
import { deleteComment } from '../../actions/comment/deleteComment';

class CommentEdit extends React.Component {
  constructor(props) {
    super(props);

    let idPost = parseInt(props.match.url.split('/')[2]);
    let post = props.posts.filter(post => post.id === idPost)[0];
    let comment = post.comments.filter(comment => comment.id === parseInt(props.match.params.id))[0];

    this.state = {
      content: comment.content
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();

    let commentId = parseInt(this.props.match.params.id);
    let post = this.props.posts.filter(post => post.comments.find(comment => comment.id === commentId))[0];
    
    let comment = { 
      ...this.state, 
      post_id: post.id, 
      id: commentId 
    };

    this.props.editComment(comment, post);
    this.props.history.push(`/posts/${post.id}/comments`);
  }

  handleCommentDelete = comment => {
    this.props.deleteComment(comment);
    this.props.history.push(`/posts/${comment.post_id}/comments`);
  }

  render() {
    let idPost = parseInt(this.props.match.url.split('/')[2]);
    let post = this.props.posts.filter(post => post.id === idPost)[0];
    let comment = post.comments.filter(comment => comment.id === parseInt(this.props.match.params.id))[0];

    return (
      <div class='container-fluid bg-white rounded m-3 p-3 mx-auto'>
        <form onSubmit={this.handleOnSubmit}>

          <label for='exampleFormControlTextarea1' class='form-label text-muted'>
            Edit Comment as {this.props.user ? this.props.user.username : null}
          </label>

          <textarea class='form-control' placeholder='What are your thoughts?' name='content' rows='5' value={this.state.content} onChange={this.handleOnChange} />

          <div class='d-grid mt-1'>
            <input type='submit' class='btn btn-primary' value='Edit Comment' />
            <input type='delete' class='btn btn-primary mt-1' value='Delete Comment' onClick={event => this.handleCommentDelete(comment)} />
          </div>
          
        </form>
      </div>
    );
  }
}

export default connect(null, { editComment, deleteComment })(CommentEdit);
