
const notiReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTI':
            return action.data
    
        default:
            return state
    }
}

export const setNoti = (noti) => {
    return {
        type: 'SET_NOTI',
        data: noti
    }
}

export default notiReducer