import React from 'react';

import CommentInput from '../components/comments/CommentInput'
import Comments from '../components/comments/Comments'
import Post from '../components/posts/Post'


class CommentsContainer extends React.Component {
    render() {
        return (
            <div>
                {/* <Post posts={this.props.posts}/> */}
                {/* <CommentInput post={this.props.post} />
                <Comments posts={this.props.post && this.props.post.comments} /> */}

                {/* <Post posts={this.props.posts} /> */}
                <CommentInput />
                <Comments posts={this.props.posts} id={this.props.match.params.id}/>

            </div>
        )
    }
}

export default CommentsContainer