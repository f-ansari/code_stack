import React, { useState, useEffect } from 'react'

const SignUp = () => {
  const [firstname, setFirstname] = useState('')
  const [handle, setHandle] = useState('')
  const [firstname, setFirstname] = useState('')
  const [firstname, setFirstname] = useState('')

  const handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={() => handleSubmit}>
        <input
          name="firstname"
          placeholder="First Name"
          type="text"
          value={firstname}
          onChange={() => handleChange}
        />
        <input
          name="handle"
          placeholder="handle"
          type="text"
          value={handle}
          onChange={() => handleChange}
        />
        <input
          name="email"
          placeholder="email@me.com"
          type="text"
          value={email}
          onChange={() => handleChange}
        />
        <input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={() => handleChange}
        />
        <input
          name="avatar"
          placeholder="Paste an image to use for your profile"
          type="avatar"
          value={email}
          onChange={() => handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SignUp
