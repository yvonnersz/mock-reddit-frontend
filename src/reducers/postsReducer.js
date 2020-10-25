export default function postsReducer(state = { posts: [] }, action) {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {posts: action.payload}
        case 'ADD_POST':
            // console.log({...state, posts: [...state.posts, action.payload]})
            let addPost = {...action.payload, comments: []}
            return {...state, posts: [...state.posts, addPost]}
        case 'ADD_COMMENT':
            let addcommentpost = state.posts.filter(post => post.id === action.payload.post_id)[0] 

            let newlyaddedcomment = {...addcommentpost, comments: [...addcommentpost.comments, action.payload]}

            // // find post index to replace newlyaddedcomment

            let addcommentpostindex = state.posts.findIndex(post => post.id === action.payload.post_id)


            let addcommentbegin = state.posts.slice(0, addcommentpostindex)

            let addcommentend = state.posts.slice(addcommentpostindex + 1)

            let newlyaddedpostcomment = addcommentbegin.concat(newlyaddedcomment).concat(addcommentend)

            return {...state, posts: newlyaddedpostcomment}

        case 'EDIT_POST':
            // let filteredPost = state.posts.filter(post => post.id === action.payload.id)[0]
            // let editPost = {...filteredPost, title: action.payload.title, content: action.payload.content, subreddit: action.payload.subreddit}
            // return {...state, posts: [editPost]}

            console.log(action.payload)

            // FIND INDEX OF POST

            let oldobjectindex = state.posts.findIndex(post => post.id === action.payload.id)

            let beginningofarray = state.posts.slice(0, oldobjectindex)

            let endofarray = state.posts.slice(oldobjectindex + 1)

            let neweditpostarray = beginningofarray.concat(action.payload).concat(endofarray)

            return {...state, posts: neweditpostarray}

        case 'EDIT_VOTE':
            // let filteredPost2 = state.posts.filter(post => post.id === action.payload.id)[0]
            // let editPost2 = {...filteredPost2, upvotes: action.payload.upvotes}
            // return {...state, posts: [editPost2]}

            //find id
            let postVoteId = state.posts.findIndex(post => post.id === action.payload.id)

            //slice array

            let beginning = state.posts.slice(0, postVoteId)
            // add new object
            let end = state.posts.slice(postVoteId + 1)

            let newArray = beginning.concat(action.payload).concat(end)

            return {...state, posts: newArray}

            // return {...state, posts: state.posts}
        case 'EDIT_COMMENT_VOTE':

            //CREATE POST WITH NEW COMMENT

            let desiredpost = state.posts.filter(post => post.id === action.payload.post_id)[0]

            let commentindex = desiredpost.comments.findIndex(comment => comment.id === action.payload.id)

            let commentbegin = desiredpost.comments.slice(0, commentindex)
            let commentend = desiredpost.comments.slice(commentindex + 1)

            let newcomment = commentbegin.concat(action.payload).concat(commentend)

            let newobjectpost = {...desiredpost, comments: newcomment}
            console.log(newobjectpost)

            // SLICE

            let findindex = state.posts.findIndex(post => post.id === action.payload.post_id)

            let begslice = state.posts.slice(0, findindex)
            let endslice = state.posts.slice(findindex + 1)

            let allposts = begslice.concat(newobjectpost).concat(endslice)
            
            return {...state, posts: allposts}

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