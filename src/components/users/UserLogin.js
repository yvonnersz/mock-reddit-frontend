import React from 'react';

class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.target.reset();

    this.props.handleLogin(this.state.username, this.state.password);

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div class='modal fade' id='login-modal' tabindex='-1' aria-hidden='true'>
        <div class='modal-dialog modal-content'>

          <div class='modal-header'>
            <h5 class='modal-title'> Login </h5>
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>

          <div class='modal-body form-group'>
            <form onSubmit={this.handleSubmit}>
              <input type='text' class='form-control mb-1' name='username' placeholder='Enter username' onChange={this.handleOnChange} />
              <input type='password' class='form-control mb-1' name='password' placeholder='Enter password' onChange={this.handleOnChange} />

              { this.props.user ? 
                <div class="alert alert-success mt-2 mb-2" role="alert">
                  Successfully logged in as {this.props.user.username}
                </div> 
              : null }

              { this.props.loginError ? 
                <div class="alert alert-danger" role="alert">
                  Invalid credentials. Please try again.
                </div> 
              : null }
            
              <div class="d-grid">
                <input type='submit' class='btn btn-primary' value='Login' />
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UserLogin;
