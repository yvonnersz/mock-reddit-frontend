import React from 'react';

import LoginInput from './components/sessions/LoginInput';

import PostsContainer from './containers/PostsContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <LoginInput />
        <PostsContainer />
      </div>
    );
  }
}

export default App;
