import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./Login.css";
import axios from "axios";
import userStore from '../../store/useUserStore';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()
  const { loginUser } = userStore((state) => state)

  useEffect(() => {
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      'email': emailRef.current.value,
      'password': passwordRef.current.value
    }
    console.log(loginData);
    const response = await
    axios.post("http://localhost:3000/api/auth/login", loginData)
    console.log(response.data);
    loginUser(response.data)
    navigate('/')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">BLOG APP</h3>
          <span className="loginDesc">Enjoy your cooding</span>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
        <div className="loginRight">
          <div className="loginBox">
            <p className="loginMsg">Login</p>
            <input ref={emailRef} type="text" className="loginInput" placeholder="Email"/>
            <input ref={passwordRef} type="text" className="loginInput" placeholder="Password"/>
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginResisterButton">Sign up</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}
