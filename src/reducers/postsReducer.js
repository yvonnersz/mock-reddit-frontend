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
            let filteredPost = state.posts.filter(post => post.id === action.payload.id)[0]
            let editPost = {...filteredPost, title: action.payload.title, content: action.payload.content, subreddit: action.payload.subreddit}
            return {...state, posts: [editPost]}
        case 'EDIT_VOTE':
            let filteredPost2 = state.posts.filter(post => post.id === action.payload.id)[0]
            let editPost2 = {...filteredPost2, upvotes: action.payload.upvotes}
            return {...state, posts: [editPost2]}
        case 'EDIT_COMMENT_VOTE':
            // NEED TO SET UP REDUCER TO REFLECT COMMENT UPVOTE CHANGE.
        default:
            return state
    }
}