import React from "react";
import axios from "axios";

class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.handleLogin(username, password)
    // axios.post(
    //   "http://localhost:3000/sessions",
    //   {
    //     user: {
    //       username: username,
    //       password: password
    //     },
    //   },
    //   { withCredentials: true }
    // );

    this.props.history.push("/");
  };

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={this.handleOnChange}
            ></input>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={this.handleOnChange}
            ></input>

            <input type="submit" value="Login"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default UserLogin;
