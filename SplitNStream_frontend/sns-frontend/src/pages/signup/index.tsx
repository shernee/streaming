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
    const [user, setUser] = useState<SignUpShape>({username: '', first_name:'', last_name: '', email: '',password:''})

    useEffect(() => {
        const registerUserUrl = `/api/register-user/`
        axios.get(registerUserUrl)
      }, [])


    const registerUser = () => {
       
        const registerUserUrl = `/api/register-user/`
        const registerUserPostData = {
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        }
        axios.post(registerUserUrl, registerUserPostData).then((resp) => {
          if(resp.status === 201) {
            const createuserid = resp.data.userid
            navigate('/login')
          } else {
            alert(`${resp.statusText}`)
          }
        })
      }
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
               <form onSubmit={registerUser} >
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
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password'
                     onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>              
                  <div className='submit'>
                     <button>Register Me</button>
                  </div>
             </form>
         </div>
      </div>
     );

    }


