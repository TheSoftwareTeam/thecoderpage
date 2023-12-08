import React, { useContext } from "react";
import "./login.scss";
import UserContext from "../../context/UserContext";
import { FaRegWindowClose } from "react-icons/fa";

const Login = () => {
  const { dispatch, login } = useContext(UserContext);

  return (
    <div className="login-container">
      <form onSubmit={login}>
        <button
          className="exit"
          onClick={() => dispatch({ type: "isLoginPage" })}
        >
          <FaRegWindowClose size={25}/>
        </button>
        <h2>Giriş Yap</h2>
        <input
          onChange={(e) =>
            dispatch({ type: "loginUserName", payload: e.target.value })
          }
          type="text"
          placeholder="Kullanıcı adı"
          required
        />
        <input
          onChange={(e) =>
            dispatch({ type: "loginPassword", payload: e.target.value })
          }
          type="password"
          placeholder="Şifre"
          required
        />
        <input type="submit" value="Giriş yap" />
        <button
          className="signUpButton"
          onClick={() => {
            dispatch({ type: "isLoginPage" });
            dispatch({ type: "isSignUpPage" });
          }}
        >
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Login;
