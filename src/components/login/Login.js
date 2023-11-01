import React from "react";
import "./login.scss"
const Login = () => {
  return (
    <div className="login-container">
  
      <form>
      <h2>Giriş Yap</h2>
        <input type="text" placeholder="Kullanıcı adı" />
        <input type="password" placeholder="Şifre" />
        
        <input type="submit" value="Giriş yap" />
        <button>
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Login;
