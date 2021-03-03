import React from "react";
import axios from "axios";

class UserInput extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, password_confirmation } = this.state;

    axios.post(
      "http://localhost:3000/users",
      {
        user: {
          username: username,
          password: password,
          password_confirmation: password_confirmation,
        },
      },
      { withCredentials: true }
    );

    this.props.history.push("/");
  };

  render() {
    return (
      <div class='modal fade' id='signup-modal' tabindex='-1' aria-hidden='true'>
      <div class='modal-dialog'>
        <div class='modal-content'>

          <div class='modal-header'>
            <h5 class='modal-title'>
              Register
            </h5>

            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>

          <div class='modal-body'>
          <div class='form-group'>

          <form onSubmit={this.handleSubmit}>
             <input
              type="text"
              name="username"
              placeholder="Enter in a username"
              onChange={this.handleOnChange}
              class='form-control mb-1'
            ></input>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={this.handleOnChange}
              class='form-control mb-1'
            ></input>

            <input
              type="password"
              name="password_confirmation"
              placeholder="Enter password"
              onChange={this.handleOnChange}
              class='form-control mb-1'
            ></input>

          </form>
          </div>
          </div>

          <div class='modal-footer'>
            <button type='submit' class='btn btn-primary' data-bs-dismiss='modal'>
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
    );
  }
}

export default UserInput;
