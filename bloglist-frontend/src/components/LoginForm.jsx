const LoginForm = ( { username, password, handlePasswordChange, handleUsernameChange, handleLogin }) => {
  return(
  <form method='post' onSubmit={handleLogin}>
    <div>
      Username:
      <input 
      type='text'
      value={username}
      name='Username'
      onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label>
      Password:
      <input
        type='text'
        value={password}
        name='Password'
        onChange={handlePasswordChange}/>
      </label>
    </div>
      <button type='submit'>login</button>
  </form>
  )
}


export default LoginForm