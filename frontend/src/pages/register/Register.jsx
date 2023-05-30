import React, {useState, useEffect} from 'react'
import "./Register.css"
import axios from 'axios'


export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const [data, setData] = useState(null)

  const registerUser = async (data) => {
    const response = await    
      axios.post("http://localhost:3000/api/auth/register", data)
      console.log(response.data);
  };

const onSubmit = (e) => {
  e.preventDefault()
  setData({username,email,password})
  registerUser(data)
}

useEffect(() => {
  // console.log({data})
}, [data])


  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">BLOG APP</h3>
          <span className="registerDesc">Enjoy your cooding</span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <form onSubmit={(e) => onSubmit(e)}>
              <p className="registerMsg">Sign Up</p>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="registerInput" placeholder="Username"/>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  className="registerInput" placeholder="Email"/>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="registerInput" placeholder="Password"/>
              <input type="text" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} className="registerInput" placeholder="Confirm Password"/>
              <button className="registerResisterButton">Sign up</button>
              <button className="loginButton">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
