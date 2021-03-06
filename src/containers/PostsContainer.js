import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Post from '../components/posts/Post';
import PostEdit from '../components/posts/PostEdit';
import PostInput from '../components/posts/PostInput';
import Posts from '../components/posts/Posts';
import CommentsContainer from './CommentsContainer';
import CommentEdit from '../components/comments/CommentEdit.js';
import NavBar from '../components/NavBar';
import UserInput from '../components/users/UserInput';
import UserLogin from '../components/users/UserLogin';
import { fetchPosts } from '../actions/post/fetchPosts';

class PostsContainer extends React.Component {
  render() {
    return (
      <div>
        <NavBar user={this.props.user} handleLogin={this.props.handleLogin} handleLogOut={this.props.handleLogOut} />

        <Switch>
          <Route exact path='/' render= {routerProps => <Posts {...routerProps} posts={this.props.posts} user={this.props.user} />} />
          <Route exact path='/posts/new' render={routerProps => <PostInput {...routerProps} user={this.props.user} />} />
          <Route path='/register' render={routerProps => <UserInput {...routerProps} />} />
          <Route path='/login' render={routerProps => <UserLogin {...routerProps} handleLogin={this.props.handleLogin} />} />
          <Route path='/posts/:id/comments/:id' render={routerProps => <CommentEdit {...routerProps} posts={this.props.posts}/>} />
          <Route path='/posts/:id/comments' render={routerProps => <> <Post {...routerProps} posts={this.props.posts} user={this.props.user} /> <CommentsContainer {...routerProps} posts={this.props.posts} user={this.props.user}/> </> } />
          <Route path='/posts/:id/edit' render={routerProps => <PostEdit {...routerProps} posts={this.props.posts} />} />
          <Route path='/posts/:id' render={routerProps => <><Post {...routerProps} posts={this.props.posts} user={this.props.user}/></>} />
        </Switch>

        <UserLogin handleLogin={this.props.handleLogin} user={this.props.user} loginError={this.props.loginError} />
        <UserInput handleLogin={this.props.handleLogin} user={this.props.user} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchPosts();
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostsContainer);