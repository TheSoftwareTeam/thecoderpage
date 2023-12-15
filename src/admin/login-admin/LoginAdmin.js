import React, { useContext } from "react";
import "./login-admin.scss";
import AdminContext from "../../context/AdminContext";

const LoginAdmin = () => {
  const { dispatch,loginAdmin } = useContext(AdminContext);

  return (
    <div className="login-container">
      <form onSubmit={loginAdmin}>
        <h2>Admin girişi</h2>
        <input
          onChange={(e) =>
            dispatch({ type: "loginUserName", payload: e.target.value })
          }
          type="text"
          placeholder="E-mail"
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
       
      </form>
    </div>
  );
};

export default LoginAdmin;
