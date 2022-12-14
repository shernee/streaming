import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'pages/login/index.css'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true


export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState("")

  useEffect(() => {
    console.log('in login')
    const loginUrl = `/api/auth/login/`
    axios.get(loginUrl).then((r)=>{console.log(r)})
  }, [])

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginUrl = `/api/auth/login/`
    let formData = new FormData();    
    formData.append('username', username);   
    formData.append('password', password);
    formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken') || "");
    const userLogin = async() => {
      axios.post(loginUrl, formData).then((loginResponse) => {
        if(loginResponse.status === 202) {
          navigate('/home')
        }   
      }).catch(error => {
        setErrors(error.response.data.message)
      })
      
    }
    userLogin()
  }

  return (
    <div className="login-page">
      <div className='cover'>
        <input 
          type='text' 
          id='username' 
          name='username' 
          placeholder='username' 
          onChange={(e) => {setUsername(e.target.value)}}
          />
        <input 
          type='password' 
          id='password' 
          name='password' 
          placeholder='password' 
          onChange={(e) => {setPassword(e.target.value)}}
          />
          {!!errors && <p className="error-text">{errors}</p>}  
          <div className="login-btn" onClick={(e) => handleLogin(e)}>Login</div>
          <span className='signup' onClick={e => navigate('/signup')}>
            Not a member yet? <span style={{color: 'rgb(100, 156, 156)'}}>Signup!</span>
          </span>
      </div>
    </div>
  )
}
