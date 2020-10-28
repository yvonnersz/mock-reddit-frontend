export const editPost = (post) => {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(json => dispatch({ type: 'EDIT_POST', payload: json }))
    }
}