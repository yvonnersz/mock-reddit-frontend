import React from 'react';
import PostInput from '../components/PostInput';
import Posts from '../components/Posts';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/fetchPosts';

class PostsContainer extends React.Component {
    render() {
        return (
            <div>
                <PostInput />
                <Posts />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect (mapStateToProps, {fetchPosts})(PostsContainer);