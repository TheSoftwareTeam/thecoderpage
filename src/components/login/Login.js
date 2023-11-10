import React, { useContext } from "react";
import "./login.scss";
import {useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Login = () => {
  const { dispatch, login } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <form onSubmit={login}>
        <h2>Giriş Yap</h2>
        <input
          onChange={(e) =>
            dispatch({ type: "loginUserName", payload: e.target.value })
          }
          type="text"
          placeholder="Kullanıcı adı"
        required/>
        <input
          onChange={(e) =>
            dispatch({ type: "loginPassword", payload: e.target.value })
          }
          type="password"
          placeholder="Şifre"
          required/>
        <input type="submit" value="Giriş yap" />
        <button onClick={()=>navigate("/home/signup")}>
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Login;
