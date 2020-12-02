
const errorMessageReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.data
    
        default:
            return state
    }
}

export const setErrorMessage = (errorMessage) => {
    return {
        type: 'SET_MESSAGE',
        data: errorMessage
    }
}

export default errorMessageReducer