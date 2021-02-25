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
                let newPost = {...json, user: props.user}
                dispatch({ type: 'ADD_POST', payload: newPost })
                props.history.push({
                    pathname: `/posts/${json.id}/comments`,
                    new: true
                })
            }
        })
    }
}