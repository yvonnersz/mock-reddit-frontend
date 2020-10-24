import React from 'react';

import Comment from './Comment';

// const Comments = (props) => {
//     console.log(props.posts)
//     return (
//         <div>
//             <h3>Comments</h3>
            // {/* {props.posts && props.posts.map(comment => <Comment key={comment.id} comment={comment} />)} */}

//             {/* I NEED TO GRAB ID OF URL */}
//         </div>
//     )    
// }

class Comments extends React.Component {
    render() {
        let post = this.props.posts.filter(post => post.id === 1)[0]
        
        return (
            <div>
                {/* {this.props.posts && this.props.posts.map(comment => <Comment key={comment.id} comment={comment} />)} */}
                <h3>Comments</h3>

                {post ? post.comments.map(comment => <Comment key={comment.id} comment={comment}/>):null}
           </div>
        )
    }
}

export default Comments