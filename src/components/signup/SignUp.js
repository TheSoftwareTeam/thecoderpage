import React from 'react'
import "./signup.scss"
import { NavLink } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="login-container">
  
      <form>
      <h2>Kaydol</h2>
        <input type="text" placeholder="Kullanıcı adı" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Şifre" />
        
        <input type="submit" value="Kaydol" />
        <button>
        <NavLink id="login-link" to="/home/login">Giriş Yap</NavLink>
        </button>
       
      </form>
    </div>
  )
}

export default SignUp