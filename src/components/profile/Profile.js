import React, { useContext, useEffect, useState } from "react";
import "./profile.scss";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import backgrounImage from "../../images/background.JPG";
import { Outlet, useNavigate } from "react-router-dom";
// import UserProblems from "../problem/UserProblems";
const Profile = () => {
  const navigate = useNavigate();

  const { state, dispatch } =
    useContext(UserContext);

// const [selectMenu,setSelectMenu]=useState("profile");

  useEffect(() => {
    if (state.activeUser !== null) {
      dispatch({ type: "profileName", payload: state.activeUser.name });
      dispatch({ type: "profileSurname", payload: state.activeUser.surName });
    }
   
  }, [state.activeUser]);

  return (
    <div className="profile-container">
       <div className="background-image">
      <img
              src={backgrounImage}
              alt="Background"
            />
      </div>
      <div className="profile-menu">
      {state.activeUser && state.activeUser.userPicture ? (
            <img
              src={"http://localhost:3001/" + state.activeUser.userPicture}
              alt="res"
            />
          ) : (
            <img src={image} alt="res" />
          )}
          <ul>
          <li  onClick={()=>navigate(`/home/profile/detail`)}>
              Hakkında
            </li>

            <li onClick={()=>navigate(`/home/profile/problems/${state.activeUser.userName}`)}>
              Problemler
            </li>

            <li  onClick={()=>navigate(`/home/profile/edit`)}>
            Profili düzenle
          </li>
            
          </ul>
      </div>

      <div className="profile-content">
     <Outlet/>
      </div>
    </div>
  );
};

export default Profile;
