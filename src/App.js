import axios from 'axios';
import React from 'react';
import PostsContainer from './containers/PostsContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loginError: ''
    }

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  checkLogin() {
    axios.get('https://mock-reddit-backend.herokuapp.com/logged_in', { withCredentials: true })
    .then(response => {
      this.setState({
        user: response.data.user
      })
    });
  }

  handleLogin(username, password) {
    let user = {
      username: username,
      password: password
    }

    axios.post("https://mock-reddit-backend.herokuapp.com/sessions", {
      user: user,
    }, { withCredentials: true })
    .then(response => {
      if (response.data.error) {
        this.setState({
          loginError: response.data.error
        })
      } else {
        this.setState({
          user: response.data.user,
          loginError: ''
        })
      }
    });
  }

  handleLogOut() {
    axios.delete('https://mock-reddit-backend.herokuapp.com/logged_out', { withCredentials: true})
    .then(response => {
      this.setState({
        user: ''
      })
    });
  }

  componentDidMount() {
    this.checkLogin()
  }

  render() {
    return (
      <div className="App">
        <PostsContainer user={this.state.user} loginError={this.state.loginError} handleLogOut={this.handleLogOut} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;
