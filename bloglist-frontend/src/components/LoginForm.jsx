const LoginForm = ( { username, password, handlePasswordChange, handleUsernameChange, handleLogin, handleClickNew }) => {
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
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}/>
        </label>
      </div>
      <button type='submit'>login</button>
      <p><i>no account...</i><br></br>
      <button type='button' onClick={handleClickNew}>create account</button>
      </p>
    </form>
  )
}


export default LoginForm