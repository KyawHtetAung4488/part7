import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from '@material-ui/lab'

const Notification = () => {
    const noti = useSelector(state => state.noti)
    return (
        noti ? 
        <Alert severity="success">
            {noti}
        </Alert> :
        null
    )
}
export default Notification