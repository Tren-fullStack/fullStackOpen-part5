const UserForm = ({ username, password, name, handlePasswordChange, handleUsernameChange, handleNameChange, handleSignUp, handleCancelSignup }) => {
  return (
    <form onSubmit={handleSignUp}>
    <label>
      Username:
      <input
      type='text'
      value={username}
      name='Username'
      onChange={handleUsernameChange}
      />
    </label>
    <br></br>
    <label>
      Full Name:
      <input
      type='text'
      value={name}
      name='Name'
      onChange={handleNameChange}
      />
    </label>
    <br></br>
    <label>
      Password:
      <input
      type='text'
      value={password}
      name='Password'
      onChange={handlePasswordChange}
      />
    </label>
    <br></br>
      <button type='submit' >submit</button>
      <br />
      <button type='button' onClick={handleCancelSignup}>cancel</button>
    </form>
  )
}

export default UserForm