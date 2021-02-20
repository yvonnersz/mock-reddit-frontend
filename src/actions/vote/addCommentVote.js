export const addCommentVote = (vote, idComment) => {
    return(dispatch) => {
        fetch(`http://localhost:3000/api/v1/comments/${idComment}/votes`, {
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
                dispatch({ type: 'ADD_COMMENT_VOTE', payload: json })
            }
        }) 
    }
}