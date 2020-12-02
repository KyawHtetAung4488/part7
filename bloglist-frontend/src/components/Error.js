import React from 'react'
import {useSelector} from 'react-redux'
import {Alert} from '@material-ui/lab'

const Error = () => {
    const errorMessage = useSelector(state => state.errorMessage)
    return (
        errorMessage ?
        <Alert severity="error">
            {errorMessage}
        </Alert> :
        null
    )
}

export default Error