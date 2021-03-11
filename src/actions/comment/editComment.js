export const editComment = (comment, post) => {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/posts/${post.id}/comments/${comment.id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        alert(json.error);
      } else {
        dispatch({ type: "EDIT_COMMENT", payload: json });
      }
    })
  }
}
