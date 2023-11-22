import React, { useContext } from 'react'
import "./signup.scss"
import {useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext';

const SignUp = () => {
  const {dispatch,signupUser} = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="signup-container">
  
      <form onSubmit={signupUser}>
      <h2>Kaydol</h2>
        <input onChange={(e)=>dispatch({type:"signupUserName",payload:e.target.value})} type="text" placeholder="Kullanıcı adı" minLength={2} maxLength={20} required/>
        <input onChange={(e)=>dispatch({type:"signupEmail",payload:e.target.value})} type="email" placeholder="Email" required/>
        <input onChange={(e)=>dispatch({type:"signupPassword",payload:e.target.value})} type="password" placeholder="Şifre" minLength={8} maxLength={16} required/>
        <input type="submit" value="Kaydol" />
        <button  onClick={()=>navigate("/home/login")}>
       Giriş Yap
        </button>
       
      </form>
    </div>
  )
}

export default SignUp