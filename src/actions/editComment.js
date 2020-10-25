export const editComment = (comment, post) => {
    // console.log(comment.id)
    // console.log(post.id)
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${post.id}/comments/${comment.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(comment)
        })
        .then(response => response.json())
        .then(json => dispatch({ type: 'EDIT_COMMENT', payload: json }))
    }
}