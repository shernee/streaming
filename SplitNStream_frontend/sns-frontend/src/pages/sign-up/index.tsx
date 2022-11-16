import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'pages/login/index.css'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

export const SignUp = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("")

  useEffect(() => {
    const signupUrl = `/api/auth/signup/`
    axios.get(signupUrl)
  }, [])

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const signupUrl = `/api/auth/signup/`
    const signupPostData = {
        first_name:"",
        last_name: "",
        email: "",
        username: "",
        password: "",
    }
    axios.post(signupUrl, signupPostData).then((resp) => {

    }).catch(error => {

    })
  }

  return (
    <div className="login-page">
      <div className='cover'>
        <input 
          type='text' 
          id='first_name' 
          name='first_name' 
          placeholder='First Name' 
          onChange={(e) => {setFirstName(e.target.value)}}
          />
        <input 
          type='text' 
          id='last_name' 
          name='last_name' 
          placeholder='Last Name' 
          onChange={(e) => {setLastName(e.target.value)}}
          />
        <input 
          type='text' 
          id='email' 
          name='email' 
          placeholder='Email Address' 
          onChange={(e) => {setEmail(e.target.value)}}
          />
        <input 
          type='text' 
          id='username' 
          name='username' 
          placeholder='Username' 
          onChange={(e) => {setUsername(e.target.value)}}
          />
        <input 
          type='password' 
          id='password' 
          name='password' 
          placeholder='Password' 
          onChange={(e) => {setPassword(e.target.value)}}
          />
          <div className="signup-btn" onClick={(e) => handleSignup(e)}>Login</div>
      </div>
    </div>
  )
}
