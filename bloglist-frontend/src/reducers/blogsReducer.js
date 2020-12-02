
const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT': 
            return action.data
        case 'NEW_BLOG':
            console.log('state: ', state);
            console.log('action data: ', action.data);
            return [...state, action.data]
        case 'UPDATE_BLOG':
            // const restofblog = state.filter(blog => blog.id !== action.data.id)
            return state.map(blog => blog.id === action.data.id ? action.data : blog )
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export const initialBlog = (blogs) => {
    return {
        type: 'INIT',
        data: blogs
    }
}

export const createBlog = (newObject) => {
    return {
        type: 'NEW_BLOG',
        data: newObject
    }
}

export const updateBlog = (updatedObject) => {
    return {
        type: 'UPDATE_BLOG',
        data: updatedObject
    }
}

export const removeBlog = (id) => {
    return {
        type: 'REMOVE_BLOG',
        data: { id }
    }
}

export default blogsReducer