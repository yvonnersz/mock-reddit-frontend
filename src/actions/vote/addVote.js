export const addVote = (vote, postId) => {
  return dispatch => {
    fetch(`https://mock-reddit-backend.herokuapp.com/api/v1/posts/${postId}/votes`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({vote})
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        alert(json.error)
      } else {
        dispatch({ type: 'ADD_VOTE', payload: json })
      }
    }) 
  }
}