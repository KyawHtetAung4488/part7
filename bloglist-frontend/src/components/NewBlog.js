import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNoti } from '../reducers/notiReducer'
import {
  Button,
  TextField,
} from '@material-ui/core'
import blogService from '../services/blogs'

const NewBlog = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
    
        const newBlog = { author, title, url }

        const response = await blogService.create(newBlog)

        dispatch(createBlog(response))
        dispatch(setNoti('a new blog added'))
        setTimeout(() => {
          dispatch(setNoti(null))
        }, 5000)

        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return (
        <form onSubmit={addBlog} id="newBlogForm">
          <div>
            <TextField id="standard-basic" label="title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            <TextField id="standard-basic" label="author" type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} />
          </div>
          <div>
            <TextField id="standard-basic" label="url" type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} />
          </div>
          <Button color="primary" id="create-blog" type="submit">create</Button>
        </form>
    )
}

export default NewBlog
