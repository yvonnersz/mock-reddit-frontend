import React from 'react';

import Comment from './Comment';

class Comments extends React.Component {
    render() {
        let postId = parseInt(this.props.postRouterId)
        let post = this.props.posts.filter(post => post.id === postId)[0]

        return (
            <div>
                {/* {this.props.posts && this.props.posts.map(comment => <Comment key={comment.id} comment={comment} />)} */}
                {post ? post.comments.map(comment => <Comment key={comment.id} comment={comment}/>):null}
           </div>
        )
    }
}

export default Comments