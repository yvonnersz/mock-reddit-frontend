import React from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../actions/comment/addComment';

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    let comment = {
      ...this.state,
      post_id: parseInt(this.props.id),
      user_id: this.props.user ? this.props.user.id : null
    };

    this.props.addComment(comment);

    this.setState({
      content: ''
    });
  };

  render() {
    return (
      <div class='container-fluid bg-white rounded m-3 p-3 mx-auto'>
        <form onSubmit={this.handleOnSubmit}>

          <label for='exampleFormControlTextarea1' class='form-label text-muted'>
            Comment as {this.props.user ? this.props.user.username : null}
          </label>

          <textarea class='form-control' placeholder='What are your thoughts?' name='content' rows='5' value={this.state.content} onChange={this.handleOnChange} />

          <div class='d-grid mt-1'>
            <input type='submit' class='btn btn-primary' value='Comment' />
          </div>

        </form>
      </div>
    );
  }
}

export default connect(null, { addComment })(CommentInput);
