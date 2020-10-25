export const addComment = (comment, postId) => {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${postId}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({comment})
        })
        .then(response => response.json())
        .then(json => dispatch({ type: 'ADD_COMMENT', payload: json }))
    }
}