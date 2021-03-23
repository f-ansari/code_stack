import React, { useState } from 'react'

const LoginForm = () => {
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Login Form</h1>

      <form>
        <input 
          type = "text"
          name = "handle"
          value = {handle}
          onChange = {(e) => setHandle(e.target.value)}
          placeholder="jane_doe"
        />
        <input
          type = "text"
          name = "password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          placeholder="jane_doe"
        />
        <button color="black" type="submit">
            Submit
          </button>
      </form>
    </div>
  )
}

export default LoginForm