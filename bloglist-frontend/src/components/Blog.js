import React from 'react'
import { Link } from 'react-router-dom'
import {ListItemText} from '@material-ui/core'

const Blog = ({ blog }) => {
  return (
    <ListItemText>
      <Link to={`/blogs/${blog.id}`}>
        <span>{blog.title}</span>
      </Link>
      <span> by {blog.author}</span>
    </ListItemText>
  )
}

export default Blog
