export default function postsReducer(state = { posts: [] }, action) {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {posts: action.payload}
        case 'ADD_POST':
            let addPost = {...action.payload, comments: []}
            return {...state, posts: [...state.posts, addPost]}
        case 'ADD_COMMENT':
            let statepost = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let newlyupdatedpost = {...statepost, upvotes: action.payload.post.upvotes, comments: [...statepost.comments, action.payload]}
            let indexpost = state.posts.findIndex(post => post.id === action.payload.post_id)
            let slice1 = state.posts.slice(0, indexpost)
            let slice2 = state.posts.slice(indexpost + 1)
            let newarray = slice1.concat(newlyupdatedpost).concat(slice2)
            return {...state, posts: newarray}
        case 'EDIT_POST':
            let oldobjectindex = state.posts.findIndex(post => post.id === action.payload.id)
            let beginningofarray = state.posts.slice(0, oldobjectindex)
            let endofarray = state.posts.slice(oldobjectindex + 1)
            let neweditpostarray = beginningofarray.concat(action.payload).concat(endofarray)
            return {...state, posts: neweditpostarray}
        case 'EDIT_COMMENT':
             let desiredpost2 = state.posts.filter(post => post.id === action.payload.post_id)[0]
             let commentindex2 = desiredpost2.comments.findIndex(comment => comment.id === action.payload.id)
             let commentbegin2 = desiredpost2.comments.slice(0, commentindex2)
             let commentend2 = desiredpost2.comments.slice(commentindex2 + 1)
             let newcomment2 = commentbegin2.concat(action.payload).concat(commentend2)
             let newobjectpost2 = {...desiredpost2, comments: newcomment2}
             let findindex2 = state.posts.findIndex(post => post.id === action.payload.post_id)
             let begslice2 = state.posts.slice(0, findindex2)
             let endslice2 = state.posts.slice(findindex2 + 1)
             let allposts2 = begslice2.concat(newobjectpost2).concat(endslice2)
             return {...state, posts: allposts2}
        case 'DELETE_COMMENT':
            let postdeleteobject = state.posts.filter(post => post.id === action.payload.post_id)[0]
            let updatedcommentpostdeleteobject = postdeleteobject.comments.filter(comment => comment.id != action.payload.id)
            let newupdatedcommentpost = {...postdeleteobject, comments: updatedcommentpostdeleteobject}
            let indexofpost = state.posts.findIndex(post => post.id === action.payload.post_id)
            let indexslicebegin = state.posts.slice(0, indexofpost)
            let indexsliceend = state.posts.slice(indexofpost + 1)
            let newlydeletedpostobject = indexslicebegin.concat(newupdatedcommentpost).concat(indexsliceend)
            return {...state, posts: newlydeletedpostobject}
        case 'DELETE_POST':
            let newfilteredpost = state.posts.filter(post => post.id != action.payload.id)
            return {...state, posts: newfilteredpost}
        default:
            return state
    }
}