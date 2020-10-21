import React from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions/fetchPosts';
import {Route, Switch} from 'react-router-dom';

import PostInput from '../components/posts/PostInput';
import Posts from '../components/posts/Posts';
import Post from '../components/posts/Post';

class PostsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }
    
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/posts/new' component={PostInput} />

                    <Route path='/posts/:id' render={(routerProps) => <Post {...routerProps} posts={this.props.posts} />} />
                    
                    <Route exact path='/posts' render= {(routerProps) => <Posts {...routerProps} posts={this.props.posts} />} />
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