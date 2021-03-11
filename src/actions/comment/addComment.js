export const addComment = comment => {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/posts/${comment.post_id}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: "POST",
      body: JSON.stringify({ comment })
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        alert(json.error);
      } else {
        dispatch({ type: "ADD_COMMENT", payload: json });
      }
    })
  }
}
