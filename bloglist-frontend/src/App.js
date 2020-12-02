import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import NewBlog from './components/NewBlog'
import Toggable from './components/Toggable'
import UserList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import BlogInfo from './components/BlogInfo'
import Container from '@material-ui/core/Container'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  TextField,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector, useDispatch} from 'react-redux'
import { initialBlog } from './reducers/blogsReducer'
import { setErrorMessage } from './reducers/errorMessageReducer'
import { setUser } from './reducers/userReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()

  useEffect(() => {
    blogService.getAll()
    .then(blogs => dispatch(initialBlog(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if (loggedUserJson) {
      dispatch(setUser(JSON.parse(loggedUserJson)))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('Wrong credential')
      dispatch(setErrorMessage('wrong username or password'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <Container>
        <Typography variant="h4">Log in to application</Typography>
        <Error />
        <form onSubmit={handleLogin} >
          <div>
            <TextField id="username" variant="outlined" label="Username" type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
          </div>

          <div>
            <TextField id="password" variant="outlined" label="Password" type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
          </div>

          <Button color="primary" type="submit" id="login-button">login</Button>
        </form>
      </Container>
    )
  }

  return (
    <Container>
      <Router>

        <Notification />

        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Blogs
            </Typography>
            <Typography variant="subtitle1">
             { user.username } logged in
            </Typography>
            <Button color="inherit" component={Link} to="/" >
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users" >
              users
            </Button>
            <Button color="inherit" onClick={handleLogout}>logout</Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/blogs/:id">
            <BlogInfo />
          </Route>
          <Route path="/users/:id">
            <UserBlogs />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <Container>
              <Typography variant="h5">Blog List</Typography>
              {blogs.map(blog =>
                <ListItem>
                  <Blog key={blog.id} blog={blog}  />
                </ListItem>
              )}
              <Toggable buttonLabel="new blog">
                <NewBlog />
              </Toggable>
            </Container>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
