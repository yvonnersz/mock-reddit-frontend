export const deleteVote = vote => {
  return dispatch => {
    fetch(`https://mock-reddit-backend.herokuapp.com/api/v1/posts/${vote.post_id}/votes/${vote.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch({ type: 'DELETE_VOTE', payload: json }))
  }
}