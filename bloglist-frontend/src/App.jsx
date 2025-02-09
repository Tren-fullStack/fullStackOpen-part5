import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      console.log('wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    // clear user token and reload page to login form
    window.localStorage.clear()
    setUser(null)
  } 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => {
    return(
      <div>
        <h1>login</h1>
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
        <p>
          <i>{user.name} is logged in </i>
          <button onClick={handleLogout}>logout</button>
        </p>
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