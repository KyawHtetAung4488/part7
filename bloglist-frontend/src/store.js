import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notiReducer from './reducers/notiReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducers = combineReducers({
    blogs: blogsReducer,
    noti: notiReducer,
    user: userReducer,
    errorMessage: errorMessageReducer,
    userList: userListReducer,
})
const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
