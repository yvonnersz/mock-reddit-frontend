export const addPost = (post, props) => {
    return(dispatch) => {
        fetch('http://localhost:3000/api/v1/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                alert(json.error)
            } else {
                dispatch({ type: 'ADD_POST', payload: json })
                props.history.push(`/posts/${json.id}`)
            }
        })
    }
}