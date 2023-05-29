import React from 'react'
import "./Register.css"


export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">BLOG APP</h3>
          <span className="registerDesc">Enjoy your cooding</span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <p className="registerMsg">Sign Up</p>
            <input type="text" className="registerInput" placeholder="Username"/>
            <input type="text" className="registerInput" placeholder="Email"/>
            <input type="text" className="registerInput" placeholder="Password"/>
            <input type="text" className="registerInput" placeholder="Confirm Password"/>
            <button className="registerResisterButton">Sign up</button>
            <button className="loginButton">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
