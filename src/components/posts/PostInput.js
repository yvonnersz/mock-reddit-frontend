import React from 'react';
import { connect } from 'react-redux';

import { addPost } from '../../actions/post/addPost';

class PostInput extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: ''
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    
    let post = {
      title: this.state.title,
      content: this.state.content,
      user_id: this.props.user.id
    }

    this.props.addPost(post, this.props);

    this.setState({
      title: '',
      content: ''
    });
  };

  render() {
    return (
      <div class='container-fluid bg-white rounded m-3 p-3 mx-auto text-center'>

        <h4>Create a Post</h4>

        <div class='form-group'>

          <form onSubmit={this.handleOnSubmit}>
            <input type='text' class='form-control mb-1' placeholder='Title' value={this.state.title} name='title' onChange={this.handleOnChange} />
            <textarea rows='7' class='form-control' placeholder='Content' value={this.state.content} name='content' onChange={this.handleOnChange} />
            
            <div class="d-grid mt-1">

              <input type='submit' class='btn btn-primary' value='Create Post' />

              </div>
          </form>

        </div>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostInput);
