import React from 'react'
import PropTypes from 'prop-types'

export default function LoginForm (
  { handleSubmit, username, password, handleUserNameChange, handleUserPasswordChange }) {

  return(
    <form onSubmit={handleSubmit}>
      <div>
            username
        <input
          type="text"
          value={username}
          name="Username"
          placeholder='login-username'
          onChange={handleUserNameChange}
        />
      </div>
      <div>
            password
        <input
          type="password"
          value={password}
          name="Password"
          placeholder='login-password'
          onChange={handleUserPasswordChange}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

}

LoginForm.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
