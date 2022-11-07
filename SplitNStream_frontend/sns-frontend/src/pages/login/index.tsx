import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <input type='text' id='username' name='username' placeholder='username' />
        <input type='text' id='password' name='password' placeholder='password' />
        <input type='submit' value='Login'/>
      </form>
    </div>
  )
}