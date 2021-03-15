export const deleteComment = comment => {
  return dispatch => {
    return fetch(`https://mock-reddit-backend.herokuapp.com/api/v1/posts/${comment.post_id}/comments/${comment.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(response => response.json())
    .then(json => dispatch({ type: "DELETE_COMMENT", payload: json }))
  }
}
