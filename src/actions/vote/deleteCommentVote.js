export const deleteCommentVote = vote => {
  return(dispatch) => {
    fetch(`http://localhost:3000/api/v1/comments/${vote.comment_id}/votes/${vote.id}`, {
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(json => dispatch({ type: 'DELETE_COMMENT_VOTE', payload: json }))
  }
}