/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import "./users.scss";
import image from"../../images/avatar.png";
import { useNavigate } from "react-router-dom";


const Users = () => {
  const {state,dispatch,signupUser} = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div id="users-container">
       <form onSubmit={signupUser}>
      <h2>Kullanıcı Oluştur</h2>
        <input onChange={(e)=>dispatch({type:"signupUserName",payload:e.target.value})} type="text" placeholder="Kullanıcı adı" required/>
        <input onChange={(e)=>dispatch({type:"signupEmail",payload:e.target.value})} type="email" placeholder="Email" required/>
        <input onChange={(e)=>dispatch({type:"signupPassword",payload:e.target.value})} type="password" placeholder="Şifre" required/>
        <input type="submit" value="Kullanıcı Oluştur" />
      </form>

      {state.users.map((user) => (
        <div onClick={()=>navigate(`/admin/userdetail/${user.userName}`)} className="user" key={user.id}>
          <div className="user-image">
            <img src={image} />
          </div>
          <p className="user-name">{user.userName}</p>
          <h2>
            {user.name} {user.surName}{" "}
          </h2>
          <div className="user-info">
            <table>
              <tr>
                <td>Telefon:</td>
                <td>+90 243 349 34 98</td>
              </tr>
                <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Rol:</td>
                <td>Kullanıcı</td>
              </tr>
              <tr>
                <td>Tarih:</td>
                <td>{user.createDate.split(" ")[0]}</td>
              </tr>
            </table>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Users;
