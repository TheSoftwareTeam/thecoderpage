/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import "./users.scss";
import image from "../../images/avatar.png";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { state, dispatch, createUser } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div id="users-container">
      <form onSubmit={createUser}>
        <h2>Kullanıcı Oluştur</h2>
        <input
          onChange={(e) =>
            dispatch({ type: "createUserName", payload: e.target.value })
          }
          value={state.createUserName}
          type="text"
          placeholder="Kullanıcı adı"
          required
        />
        <input
          onChange={(e) =>
            dispatch({ type: "createEmail", payload: e.target.value })
          }
          value={state.createEmail}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) =>
            dispatch({ type: "createPassword", payload: e.target.value })
          }
          value={state.createPassword}
          type="password"
          placeholder="Şifre"
          required
        />
        <input type="submit" value="Kullanıcı Oluştur" />
      </form>

      <div id="user-list">
        {state.users.map((user) => (
          <div
            onClick={() => navigate(`/admin/userdetail/${user.id}`)}
            className="user"
            key={user.id}
          >
            <div className="user-image">
              {user.userPicture ? (
                <img
                src={"http://localhost:3001/" + user.userPicture}
                alt="User"
              />
              ):(<img src={image} alt="User" />)}
              
            </div>
            <p className="user-name">{user.userName}</p>
            <h2>
              {user.name} {user.surName}
            </h2>
            <div className="user-info">
              <table>
                <tr>
                  <td>Rol:</td>
                  <td>{user.userRol}</td>
                </tr>
                <tr>
                  <td>Tarih:</td>
                  <td>{user.createDate.split(" ")[0]}</td>
                </tr>
                <tr>
                  <td>Telefon:</td>
                  <td>+90 243 349 34 98</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Problem Sayısı:</td>
                  <td>{user.problemCount}</td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
