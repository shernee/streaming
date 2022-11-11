import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.SyntheticEvent) => {
    const loginUrl = `http://splitnshare.local/api/auth/login/`
    const loginPostData = {
      username: username,
      password: password,
      next: `http://splitnshare.local/home`
    }
    console.log('In login')
    const userLogin = async() => {
      axios.post(loginUrl, loginPostData).then((loginResponse) => {
        if(loginResponse.status) {
          navigate('/home')
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