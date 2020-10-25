import React from 'react';

import CommentInput from '../components/comments/CommentInput'
import Comments from '../components/comments/Comments'
import Post from '../components/posts/Post'


class CommentsContainer extends React.Component {
    render() {
        return (
            <div>
                <CommentInput posts={this.props.posts} id={this.props.match.params.id}/>
                <Comments posts={this.props.posts} postRouterId={this.props.match.params.id}/>
            </div>
        )
    }
}

export default CommentsContainer