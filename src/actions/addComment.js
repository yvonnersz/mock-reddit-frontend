export const addComment = (comment, postId) => {

    let commentObject = {
        content: comment.content,
        user: comment.user,
        upvotes: 0,
        post_id: postId
    }

    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${postId}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(commentObject)
        })
        .then(response => response.json())
        .then(post => dispatch({ type: 'ADD_COMMENT', payload: commentObject }))
    }
}