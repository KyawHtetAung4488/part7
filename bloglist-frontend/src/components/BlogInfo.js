import React from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'
import { setNoti } from '../reducers/notiReducer'
import {useParams} from 'react-router-dom'

const BlogInfo = () =>{
    const dispatch = useDispatch()
    const id = useParams().id

    const blog = useSelector(state => state.blogs).find(n => n.id === id)
    if (!blog) {
        return null
    }

    const handleLike = async  () => {
        const updateObject = {
        user: blog.user,
        likes: blog.likes+1,
        author: blog.author,
        title: blog.title,
        url: blog.url
        }

        const response = await blogService.update(updateObject, blog.id)
        dispatch(updateBlog(response))
    }

    const remove = async id => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){

        await blogService.remove(id)
        dispatch(removeBlog(id))
        dispatch(setNoti(`Deleted ${blog.title}`))
        setTimeout(() => {
            dispatch(setNoti(null))
        }, 5000)
        }
    }
    return (
        <div className='blog'>
        <h2>
            {blog.title}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <p>added by {blog.author}</p>
        <button onClick={() => remove(blog.id)}>remove</button>
      </div>
    )
}

export default BlogInfo