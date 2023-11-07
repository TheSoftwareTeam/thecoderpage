import React, { useContext } from 'react'
import "./signup.scss"
import { NavLink } from 'react-router-dom'
import DataContext from '../../context/DataContext';

const SignUp = () => {
  const {dispatch,createUser} = useContext(DataContext);
  return (
    <div className="login-container">
  
      <form onSubmit={createUser}>
      <h2>Kaydol</h2>
        <input onChange={(e)=>dispatch({type:"signupUserName",payload:e.target.value})} type="text" placeholder="Kullanıcı adı" required/>
        <input onChange={(e)=>dispatch({type:"signupEmail",payload:e.target.value})} type="email" placeholder="Email" required/>
        <input onChange={(e)=>dispatch({type:"signupPassword",payload:e.target.value})} type="password" placeholder="Şifre" required/>
        <input type="submit" value="Kaydol" />
        <button>
        <NavLink id="login-link" to="/home/login">Giriş Yap</NavLink>
        </button>
       
      </form>
    </div>
  )
}

export default SignUp