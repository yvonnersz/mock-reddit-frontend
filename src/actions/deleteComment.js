export const deleteComment = (commentId, postId) => {
    return (dispatch) => {
      return fetch(`http://localhost:3000/api/v1/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch({type: 'DELETE_COMMENT', payload: json}))
    }
  }