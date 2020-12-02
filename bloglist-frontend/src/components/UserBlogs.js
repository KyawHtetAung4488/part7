import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
    const id = useParams().id
    const user = useSelector(state => state.userList).find(n => n.id === id)
    if(!user) {
        return null
    }
    return (
        <div>
            <h2>
                {user.username}
            </h2>
            <h3>added blogs</h3>
            <ul>
                {
                    user.blogs.map(blog => (
                        <li>
                            {blog.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default UserBlogs