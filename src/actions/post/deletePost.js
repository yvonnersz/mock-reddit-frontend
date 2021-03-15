export const deletePost = post => {
  return dispatch => {
    fetch(`https://mock-reddit-backend.herokuapp.com/api/v1/posts/${post.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch({ type: 'DELETE_POST', payload: json }))
  }
}