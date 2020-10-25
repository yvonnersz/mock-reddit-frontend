import React from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions/fetchPosts';
import {Route, Switch, Link} from 'react-router-dom';

import PostInput from '../components/posts/PostInput';
import Posts from '../components/posts/Posts';
import Post from '../components/posts/Post';
import PostEdit from '../components/posts/PostEdit';
import NavBar from '../components/NavBar';
import CommentsContainer from './CommentsContainer';
import CommentEdit from '../components/comments/CommentEdit.js';
import Home from '../components/Home';

class PostsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }
    
    render() {
        return (
            <div>
                <NavBar />

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/posts/new' component={PostInput} />
                    <Route path='/posts/:id/comments/:id' render={(routerProps) => <CommentEdit {...routerProps} posts={this.props.posts}/>} />

                    <Route path='/posts/:id/comments' render={(routerProps) =>
                        <>
                        <Post {...routerProps} posts={this.props.posts} />
                        <CommentsContainer {...routerProps} posts={this.props.posts} />
                        </>} />
                    <Route path='/posts/:id/edit' render={(routerProps) => <PostEdit {...routerProps} posts={this.props.posts} />} />
                    <Route path='/posts/:id' render={(routerProps) => <Post {...routerProps} posts={this.props.posts} />} />
                    <Route exact path='/posts' render= {(routerProps) => <Posts {...routerProps} posts={this.props.posts} />}>

                    </Route>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, {fetchPosts})(PostsContainer);