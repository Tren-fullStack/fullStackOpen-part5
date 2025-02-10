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
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
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
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
        </div>
        <AddBlogForm title={title} author={author} url={url}
          onTitleChange={handleTitleChange} onAuthorChange={handleAuthorChange}
          onUrlChange={handleUrlChange} handleSubmitBlog={handleSubmitBlog} 
          onClick={() => setCreateBlogVisible(false)} showWhenVisible={showWhenVisible}
        /><br></br>
        {blogs.map(blog => (
          <Blog key={blog.blogId} blog={blog} />
        )
        )}
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