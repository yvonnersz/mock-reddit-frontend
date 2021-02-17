import React from "react";
import { connect } from "react-redux";

import { addPost } from "../../actions/post/addPost";

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      user_id: "",
      content: "",
      upvotes: 0,
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.state.user_id = this.props.user.id;
    this.props.addPost(this.state, this.props);
    this.setState({
      title: "",
      content: "",
      user_id: this.props.user.id,
      toggle_upvote: false,
      toggle_downvote: false,
    });
  };

  render() {
    return (
      <div class="card container-fluid text-center">
        <h2>Create a Post</h2>
        <div class="form-group">
          <form onSubmit={this.handleOnSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={this.state.title}
              name="title"
              onChange={this.handleOnChange}
              class="form-control"
            />
            <br />
            <textarea
              rows="7"
              placeholder="Content"
              value={this.state.content}
              name="content"
              onChange={this.handleOnChange}
              class="form-control"
            />
            <br />
            <input type="submit" value="Create Post" />
            <br />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostInput);
