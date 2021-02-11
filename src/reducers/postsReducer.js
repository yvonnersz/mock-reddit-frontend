export default function postsReducer(state = { posts: [] }, action) {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {posts: action.payload}
        case 'ADD_POST':
            let addPost = {...action.payload, comments: [], votes: []}
            return {...state, posts: [...state.posts, addPost]}
        case 'EDIT_POST':
            // console.log(action.payload)
            let editOriginalPostIndex = state.posts.findIndex(post => post.id === action.payload.id)
            let editUpdatedPost = state.posts.slice(0, editOriginalPostIndex).concat(action.payload).concat(state.posts.slice(editOriginalPostIndex + 1))
            // console.log({...state, posts: editUpdatedPost})
            return {...state, posts: editUpdatedPost}
        case 'DELETE_POST':
            let deleteUpdatedPost = state.posts.filter(post => post.id != action.payload.id)
            return {...state, posts: deleteUpdatedPost}
        case 'ADD_COMMENT':
            let addCommentOriginalPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let addCommentUpdatedPost = {...addCommentOriginalPost, upvotes: action.payload.post.upvotes, comments: [...addCommentOriginalPost.comments, action.payload]}
            let addCommentOriginalPostIndex = state.posts.findIndex(post => post.id === action.payload.post_id)
            let addCommentUpdatedPosts = state.posts.slice(0, addCommentOriginalPostIndex).concat(addCommentUpdatedPost).concat(state.posts.slice(addCommentOriginalPostIndex + 1))
            return {...state, posts: addCommentUpdatedPosts}
        case 'EDIT_COMMENT':
            let editCommentOriginalPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let editCommentIndex = editCommentOriginalPost.comments.findIndex(comment => comment.id === action.payload.id)
            let editUpdatedComment = editCommentOriginalPost.comments.slice(0, editCommentIndex).concat(action.payload).concat(editCommentOriginalPost.comments.slice(editCommentIndex + 1))
            let editCommentUpdatedPost = {...editCommentOriginalPost, comments: editUpdatedComment}
            let editCommentOriginalPostIndex = state.posts.findIndex(post => post.id === action.payload.post_id)
            let editCommentUpdatedPosts = state.posts.slice(0, editCommentOriginalPostIndex).concat(editCommentUpdatedPost).concat(state.posts.slice(editCommentOriginalPostIndex + 1))
            return {...state, posts: editCommentUpdatedPosts}
        case 'DELETE_COMMENT':
            let deleteCommentOriginalPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let deleteComment = deleteCommentOriginalPost.comments.filter(comment => comment.id != action.payload.id)
            let deleteCommentUpdatedPost = {...deleteCommentOriginalPost, comments: deleteComment}
            let deleteCommentOriginalPostIndex = state.posts.findIndex(post => post.id === action.payload.post_id)
            let deleteCommentUpdatedPosts = state.posts.slice(0, deleteCommentOriginalPostIndex).concat(deleteCommentUpdatedPost).concat(state.posts.slice(deleteCommentOriginalPostIndex + 1))
            return {...state, posts: deleteCommentUpdatedPosts}
        case 'ADD_VOTE':
            console.log(action.payload)
            let selectPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let updatePost = {...selectPost, votes: [...selectPost.votes, action.payload]}
            let addVotePost = state.posts.findIndex(post => post.id === action.payload.post_id)
            let updatedPostVote = state.posts.slice(0, addVotePost).concat(updatePost).concat(state.posts.slice(addVotePost + 1))
            return {...state, posts: updatedPostVote}
            console.log(updatedPostVote)
        case 'DELETE_VOTE':
            console.log(action.payload)
            let deleteVoteOriginalPost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let deleteVote = deleteVoteOriginalPost.votes.filter(vote => vote.user_id !== action.payload.user_id) // return user id 3
            let deleteVoteUpdatedPost = {...deleteVoteOriginalPost, votes: deleteVote}
            let deleteVoteOriginalPostIndex = state.posts.findIndex(post => post.id === action.payload.post_id)
            let deleteVoteUpdatedPosts = state.posts.slice(0, deleteVoteOriginalPostIndex).concat(deleteVoteUpdatedPost).concat(state.posts.slice(deleteVoteOriginalPostIndex + 1))
            return {...state, posts: deleteVoteUpdatedPosts}
        default:
            return state
    }
}