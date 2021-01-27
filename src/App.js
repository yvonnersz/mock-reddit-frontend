import axios from 'axios';
import React from 'react';

import PostsContainer from './containers/PostsContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ''
    }
  }

  checkLogin() {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true})
    .then(response => {
      this.setState({
        user: response.data.user
      })
    })
  }

  componentDidMount() {
    this.checkLogin()
  }

  render() {
    return (
      <div className="App">
        <PostsContainer user={this.state.user} />
      </div>
    );
  }
}

export default App;
