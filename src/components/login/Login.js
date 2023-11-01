import React from "react";
import "./login.scss"
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-container">
  
      <form>
      <h2>Giriş Yap</h2>
        <input type="text" placeholder="Kullanıcı adı" />
        <input type="password" placeholder="Şifre" />
        
        <input type="submit" value="Giriş yap" />
        <button>
        <NavLink id="signup-link" to="/home/signup">Kaydol</NavLink>
        </button>
      </form>
    </div>
  );
};

export default Login;
