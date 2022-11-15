import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const loginUrl = `http://splitnshare.local/api/auth/login/`
    axios.get(loginUrl)
    console.log(username)
  }, [username])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginUrl = `http://splitnshare.local/api/auth/login/`
    let formData = new FormData();    

    formData.append('username', username);   
    formData.append('password', password);
    formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken') || "");
    // const loginPostData = {
    //   username: username,
    //   password: password,
    //   csrfmiddlewaretoken: Cookies.get('csrftoken')
    // }
    console.log('In login')
    const userLogin = async() => {
      axios.post(loginUrl, formData).then((loginResponse) => {
        if(loginResponse.status===202) {
          navigate('/home')
        } else {
          console.log(loginResponse.data)
        }
      })
      
    }
    userLogin()
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          id='username' 
          name='username' 
          placeholder='username' 
          onChange={(e) => {setUsername(e.target.value)}}
          />
        <input 
          type='text' 
          id='password' 
          name='password' 
          placeholder='password' 
          onChange={(e) => {setPassword(e.target.value)}}
          />
        <input type='submit' value='Login'/>
      </form>
    </div>
  )
}