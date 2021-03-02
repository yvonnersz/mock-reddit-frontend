import React from 'react';
import { connect } from 'react-redux';

import { editPost } from '../../actions/post/editPost';
import { deletePost } from '../../actions/post/deletePost';

class PostInput extends React.Component {
  constructor(props) {
    super(props);

    let post = props.posts.filter(post => post.id === parseInt(props.match.params.id))[0];

    this.state = {
      title: post.title,
      content: post.content,
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();

    let post = {
      title: this.state.title,
      content: this.state.content,
      id: parseInt(this.props.match.params.id)
    };

    this.props.editPost(post);

    this.setState({
      content: ''
    });
    
    this.props.history.push(`/posts/${this.props.match.params.id}`);
  }

  handlePostDelete = (post) => {
    this.props.deletePost(post)
    this.props.history.push('/')
  }

  render() {
    let post = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.id))[0];

    return (
      <div class='container-fluid bg-white rounded m-3 p-3 mx-auto text-center'>
        
        <h4>Edit Post</h4>

        <div class='form-group'>
          <form onSubmit={this.handleOnSubmit}>

            <input type='text' class='form-control mb-1' value={this.state.title} name='title' onChange={this.handleOnChange} aria-label="Disabled input example" disabled />
            <textarea rows='7' class='form-control' value={this.state.content} name='content' onChange={this.handleOnChange} />

            <div class='d-grid mt-1'>
              <input type='submit' class='btn btn-primary' value='Edit Post' />
              <input type='delete' class='btn btn-primary mt-1' value='Delete Post' onClick={event => this.handlePostDelete(post)} />
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { editPost, deletePost })(PostInput);
