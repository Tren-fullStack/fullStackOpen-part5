import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const sortBlogs = async () => {
    try {
      let sortedBlogs = await blogService.getAll()

      // sort blogs by number of likes
      sortedBlogs = sortedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (err) {
      console.log('something fucked up', err)
    }
  }
  useEffect(() => {
    sortBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUserJson')
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      setUser(loggedUser)
      loginService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // get user using login service
      const loginUser = await loginService.login({ username, password })

      // store user in local storage
      window.localStorage.setItem('loggedUserJson', JSON.stringify(loginUser))

      // create new token for user
      loginService.setToken(loginUser.token)

      setUser(loginUser)
      setUsername('')
      setPassword('')
    } catch (exception){
      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage(null)
      }, '3000')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    // clear user token and reload page to login form
    window.localStorage.clear()
    setUser(null)
  }
  const handleSubmitBlog = async (event) => {
    event.preventDefault()

    try {
      const blogInfo = await blogService.createBlog({ title, author, url }, user)
      console.log(blogInfo)
      const updatedBlogList = [...blogs, blogInfo]
      setBlogs(updatedBlogList)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`${blogInfo.title} by ${blogInfo.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, '3000')
    } catch (error){
      setMessage('Missing Fields')
      setTimeout(() => {
        setMessage(null)
      }, '3000')
    }
  }

  const handleRemove = async (blogId, user, title, author) => {
    // asks user for confirmation
    if (window.confirm(`Remove ${title} by ${author}`)) {
      const unathorized = await blogService.removeBlog(blogId, user)

      // checks if user has token authentication for that post
      if(unathorized) {
        setMessage(unathorized)
        setTimeout(() => {
          setMessage(null)
        }, '3000')
      }
      else {
        const updatedBlogList = blogs.filter(blog => blog.blogId !== blogId)
        setBlogs(updatedBlogList)
      }
    }
  }

  const handleAddLike = async (blogId) => {
    await blogService.addLike(blogId)

    for (let i=0; i<blogs.length; i++) {
      if (blogs[i].blogId===blogId) {
        blogs[i].likes += 1
        console.log(blogs[i].likes)
        break
      }
    }
    setBlogs([...blogs])
    sortBlogs((a, b) => b.likes - a.likes)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const loginForm = () => {
    return(
      <div>
        <h1>login</h1>
        <Notification message={message} />
        <LoginForm username={username} password={password}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLogin={handleLogin}/>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>
          <i>{user.name} is logged in </i>
          <button onClick={handleLogout}>logout</button>
        </p>
        <AddBlogForm title={title} author={author} url={url}
          onTitleChange={handleTitleChange} onAuthorChange={handleAuthorChange}
          onUrlChange={handleUrlChange} handleSubmitBlog={handleSubmitBlog} blogs={blogs}
          handleRemove={handleRemove} user={user} handleAddLike={handleAddLike}
        />
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App