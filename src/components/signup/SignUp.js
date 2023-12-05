import React, { useContext } from "react";
import "./signup.scss";
import UserContext from "../../context/UserContext";

const SignUp = () => {
  const { dispatch, signupUser } = useContext(UserContext);
  return (
    <div className="signup-container">
      <form onSubmit={signupUser}>
      <button
          className="exit"
          onClick={() => dispatch({ type: "isSignUpPage" })}
        >
          x
        </button>
        <h2>Kaydol</h2>
        <input
          onChange={(e) =>
            dispatch({ type: "signupUserName", payload: e.target.value })
          }
          type="text"
          placeholder="Kullanıcı adı"
          minLength={3}
          maxLength={20}
          required
        />
        <input
          onChange={(e) =>
            dispatch({ type: "signupEmail", payload: e.target.value })
          }
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) =>
            dispatch({ type: "signupPassword", payload: e.target.value })
          }
          type="password"
          placeholder="Şifre"
          minLength={8}
          maxLength={16}
          required
        />
        <input type="submit" value="Kaydol" />
        <button onClick={()=>{dispatch({type:"isLoginPage"})
      dispatch({type:"isSignUpPage"})}}>Giriş Yap</button>
      </form>
    </div>
  );
};

export default SignUp;
