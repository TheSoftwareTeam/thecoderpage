import React, { useContext } from "react";
import "./login.scss";
import { NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";
const Login = () => {
  const { state, dispatch, login } = useContext(DataContext);

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
        />
        <input
          onChange={(e) =>
            dispatch({ type: "loginPassword", payload: e.target.value })
          }
          type="password"
          placeholder="Şifre"
        />
        <input type="submit" value="Giriş yap" />
        <button>
          <NavLink id="signup-link" to="/home/signup">
            Kaydol
          </NavLink>
        </button>
      </form>
    </div>
  );
};

export default Login;
