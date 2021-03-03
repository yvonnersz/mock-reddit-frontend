import React from "react";

class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    this.props.handleLogin(username, password);
    this.props.history.push("/");
  };

  render() {
    return (
      <div class="modal fade" id="login-modal" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Login
              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class='form-group'>
                <form onSubmit={this.handleSubmit}>

                  <input type='text' class='form-control mb-1' name="username" placeholder="Enter username" onChange={this.handleOnChange} />
                  <input type='password' class='form-control mb-1' name="password" placeholder="Enter password" onChange={this.handleOnChange} />
                  
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                Login
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
