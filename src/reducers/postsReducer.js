export default function postsReducer(state = { posts: [] }, action) {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {posts: action.payload}
        case 'ADD_POST':
            return {...state, posts: [...state.posts, action.payload]}
        case 'ADD_COMMENT':
            let post = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let newPost = {...post, comments: [...post.comments, action.payload]}
            return {...state, posts: [newPost]}
        case 'EDIT_POST':
        // NEED TO UPDATE REDUCER SO THAT REDUX DISPLAYS EDITED POST.
            let filteredPost = state.posts.filter(post => post.id === action.payload.id)[0]

            let editPost = {...filteredPost, title: action.payload.title, content: action.payload.content, subreddit: action.payload.subreddit}

            return {...state, posts: [editPost]}
        default:
            return state
    }
}