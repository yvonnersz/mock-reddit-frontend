import axios from 'axios';
import React from 'react';

import PostsContainer from './containers/PostsContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ''
    }

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  checkLogin() {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true})
    .then(response => {
      this.setState({
        user: response.data.user
      })
    })
  }

  handleLogin(username, password) {
    let user = {
      username: username,
      password: password
    }

    axios.post(
      "http://localhost:3000/sessions",
      {
        user: user,
      },
      { withCredentials: true }
    )
    .then(response => {
      this.setState({
        user: response.data.user
      })
    })
    // .then(response => console.log(response))
  }

  handleLogOut() {
    axios.delete('http://localhost:3000/logged_out', { withCredentials: true})
    .then(response => {
      this.setState({
        user: ''
      })
    })
  }

  componentDidMount() {
    this.checkLogin()
  }

  render() {
    return (
      <div className="App">
        <PostsContainer user={this.state.user} handleLogOut={this.handleLogOut} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;
