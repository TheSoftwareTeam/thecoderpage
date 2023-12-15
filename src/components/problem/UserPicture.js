/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import { useNavigate, useParams } from "react-router-dom";
import "./scss/user-picture.scss";
import axios from "axios";

const UserPicture = ({userId,createDate, isDisabled}) => {
  let url = "http://localhost:3005";
  const { id,userName } = useParams();
  const [complaint,setComplaint]=useState(false)
  const [user,setUser]=useState({})
const {
    state,
    dispatch,
    formatRelativeTime,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const getUser = async () => {
    const response = await axios.get(`${url}/users/${userId}`);
    setUser(await response.data);
  }
  useEffect(() => {
  getUser()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);
  return (
    <div className="user-picture">
    {user.userPicture ? (
      <img
        src={
          "http://localhost:3001/" +
         user.userPicture
        }
        alt="res"
      />
    ) : (
      <img src={image} alt="res" />
    )}
    <h3
      onClick={() =>
        navigate(
          `/home/profile/${
            user.userName
          }/detail`
        )
      }
    >
      {user.userName}
    </h3>

  {createDate&& <div className="absolute-div">
    <span>{formatRelativeTime(createDate)}</span>
    { id && state.activeUser&& userId !== state.activeUser.id && (
     !isDisabled&&<a onClick={() => setComplaint(!complaint)}
       onMouseLeave={() => setComplaint(false)}>...
      <button className={complaint?"complaint-button":"hidden-complaint-button"} onClick={() => dispatch({ type: "isComplaintPage" })}>Şikayet et</button>
      </a>
  )}
   </div>}
   
  </div>
  )
}

export default UserPicture