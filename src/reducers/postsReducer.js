export default function postsReducer(state = { posts: [] }, action) {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {posts: action.payload}
        case 'ADD_POST':
            console.log(action.payload)
            // console.log({...state, posts: [...state.posts, action.payload]})
            let addPost = {...action.payload, comments: []}
            console.log(addPost)
            return {...state, posts: [...state.posts, addPost]}
        case 'ADD_COMMENT':
            let post = state.posts.filter(post => post.id === action.payload.post_id)[0]
            // console.log(post)

            let newPost = {...post, upvotes: post.upvotes + 1, comments: [...post.comments, action.payload]}
            // console.log(newPost)

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
            let selectedPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let commentIndex = selectedPost.comments.findIndex(comment => comment.id === action.payload.id)

            selectedPost.comments.splice(commentIndex, 1, action.payload)

            return {...state, posts: [selectedPost]}
            // EDIT COMMENT NEED TO FIX. WHEN UPVOTED POST, RETURNS BACK ONLY UPVOTED POST.
        case 'DELETE_COMMENT':
            let originalPost = state.posts.filter(post => post.id === action.payload.post_id )[0]
            let alteredComments = originalPost.comments.filter(comment => comment.id != action.payload.id)
            let newPostComments = {...originalPost, comments: alteredComments}

            return {...state, posts: [newPostComments]}
        case 'DELETE_POST':
            let newFilteredPost = state.posts.filter(post => post.id != action.payload.id)

            return {...state, posts: [newFilteredPost]}
        default:
            return state
    }
}