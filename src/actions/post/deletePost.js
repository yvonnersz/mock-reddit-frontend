export const deletePost = (post) => {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => dispatch({ type: 'DELETE_POST', payload: json }))
    }
}