import React from "react";
import 'pages/signup/index.css'
import { useEffect, useState } from 'react'
import {SignUpShape } from 'data/type'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

export const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    useEffect(() => {
      const registerUserUrl = `/api/register-user/`
      axios.get(registerUserUrl).then((r)=>{console.log(r)})
    }, [])


    const registerUser = (e: React.SyntheticEvent) => { 
      e.preventDefault();     
        const registerUserUrl = `/api/register-user/`
        const registerUserPostData = {
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        }
        axios.post(registerUserUrl, registerUserPostData).then((resp) => {
            if(resp.status === 201){
               navigate('/')
            }          
         }).catch(error => {
            setErrors(error.response.data.message)
         }) 
        }
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
                  <div className='firstname'>
                     <label htmlFor="first_name">First Name</label>
                     <input type='text' name='first_name'
                     onChange={(e) => {setFirstName(e.target.value)}}/>
                  </div>
                  <div className='lastname'>
                     <label htmlFor="lastname">Last Name</label>
                     <input type='text' name='last_name'
                     onChange={(e) => {setLastName(e.target.value)}}/>
                  </div>
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email'
                     onChange={(e) => {setEmail(e.target.value)}}/>
                  </div>
                  <div className='username'>
                     <label htmlFor="username">Username</label>
                     <input type='text' name='username'
                     onChange={(e) => {setUsername(e.target.value)}}/>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password'
                     onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  {!!errors && <p className="error-text">{errors}</p>}              
                  <div className='submit' onClick={(e) => {registerUser(e)}}>
                     <button>Register Me</button>
                  </div>
                  <span className='backto-login' onClick={e => navigate('/')}>
                     Go back to Login
                  </span>
         </div>
      </div>
     );

    }


