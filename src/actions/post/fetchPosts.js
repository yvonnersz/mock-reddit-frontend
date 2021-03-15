export function fetchPosts() {
  return dispatch => {
    fetch('https://mock-reddit-backend.herokuapp.com/api/v1/posts')
    .then(response => response.json())
    .then(posts => dispatch({
      type: 'FETCH_POSTS', 
      payload: posts
    }))
  }
}