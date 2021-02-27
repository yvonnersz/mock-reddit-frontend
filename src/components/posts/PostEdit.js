import React from "react";
import { connect } from "react-redux";

import { editPost } from "../../actions/post/editPost";

class PostInput extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
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
        content: this.state.content,
        id: this.props.match.params.id
    };

    this.props.editPost(post);

    this.setState({
      content: "",
    });
    
    this.props.history.push(`/posts/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div class="container-fluid bg-white rounded m-3 p-3 mx-auto text-center">
        
        <h4>Edit Post</h4>

        <div class="form-group">
          <form onSubmit={this.handleOnSubmit}>

            <input type="text" class="form-control mb-1" placeholder="Title" value={this.state.title} name="title" onChange={this.handleOnChange} />
            <textarea rows="7" class="form-control" placeholder="Content" value={this.state.content} name="content" onChange={this.handleOnChange} />

            <div class="d-grid mt-1">
              <input type="submit" class="btn btn-primary" value="Edit Post" />
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { editPost })(PostInput);
