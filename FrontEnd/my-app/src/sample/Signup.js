import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSignupSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8009/signup', {
        username: username,
        password: password
      })

      console.log(response.data)
      alert('Signup successful!')
    } catch (error) {
      console.log(error)
      alert('Service error')
    }
  }

  return (
    <div>
      <h1>Signup Form</h1>
      <form onSubmit={handleSignupSubmit}>
        Email: <input type="text" value={username} onChange={handleEmailChange} /><br />
        Password: <input type="password" value={password} onChange={handlePasswordChange} /><br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignupForm;
