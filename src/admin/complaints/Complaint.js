import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import image from "../../images/avatar.png";
import "./scss/complaint.scss";
const Complaint = ({complaint}) => {
    const { state } =
    useContext(UserContext);
  const navigate = useNavigate();

 
  return (
    <div
     
    className="complaint"
  >
    <div className="user-picture">
      {state.users.find((user) => user.id === complaint.userId)?.userPicture ? (
        <img
          src={
            "http://localhost:3001/" +
            state.users.find((user) => user.id === complaint.userId)
              ?.userPicture
          }
          alt="res"
        />
      ) : (
        <img src={image} alt="res" />
      )}
      <h5
        onClick={() =>
          navigate(
            `/admin/userdetail/${state.users.find((user) => user.id === complaint.userId)?.userName}`
          )
        }
      >
        {state.users.find((user) => user.id === complaint.userId)?.userName}
      </h5>
    </div>

    <div className="complaint-detail">
      <div  onClick={() => navigate(`/admin/complaintdetail/${complaint.id}`)} className="complaint-head-text">
        
        <h6>{complaint.complaintContent.slice(0, 150)}</h6>
      </div>

     
    </div>
  </div>
  )
}

export default Complaint