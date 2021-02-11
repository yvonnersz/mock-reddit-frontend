export const deleteVote = (vote) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/posts/${vote.post_id}/votes/${vote.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch({type: 'DELETE_VOTE', payload: json}))
    }
  }