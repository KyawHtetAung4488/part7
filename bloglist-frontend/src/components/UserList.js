import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initilizeUserList } from '../reducers/userListReducer'
import {
    Link
} from 'react-router-dom'
import {
    Container,
    Table,
    TableHead,
    TableContainer,
    Typography,
    Paper,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userList)

    useEffect(() => {
        dispatch(initilizeUserList())
    }, [dispatch])

    return (
        <Container>
            <Typography variant="h5">
                Users List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Users
                            </TableCell>
                            <TableCell>
                                Blogs created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    { user.blogs ? user.blogs.length : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default UserList