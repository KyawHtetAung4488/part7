import userListService from '../services/users'

const userListReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            console.log(action.data)
            return action.data
        default:
            return state
    }
}

export const initilizeUserList = () => {
    return async dispatch => {
        const users = await userListService.getAll()
        dispatch({
            type: 'INIT',
            data: users,
        })
    }
}

export default userListReducer