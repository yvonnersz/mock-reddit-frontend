export const editCommentVote = (comment, postId) => {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${postId}/comments/${comment.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(comment)
        })
        .then(response => response.json())
        .then(json => dispatch({ type: 'EDIT_COMMENT_VOTE', payload: json }))
    }
}