import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import image from "../../images/avatar.png";
import "./scss/complaint.scss";
const Complaint = ({complaint}) => {
    const { state,dispatch } =
    useContext(UserContext);
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch({type:"complaintTextarea",payload:""})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
  return (
    <div
     
    className="complaint"
  >
    <div className="user-complaint-picture">
      {state.users.find((user) => user.id === complaint.toUserId)?.userPicture ? (
        <img
          src={
            "http://localhost:3001/" +
            state.users.find((user) => user.id === complaint.toUserId)
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
            `/admin/userdetail/${state.users.find((user) => user.id === complaint.toUserId)?.userName}`
          )
        }
      >
        {state.users.find((user) => user.id === complaint.toUserId)?.userName}
      </h5>
      <button
        className="to-ptoblem"
        onClick={() =>
          navigate(`/admin/problemdetail/${complaint.problemId}`)
        }
      >
        Probleme Git
      </button>
    </div>

    <div className="complaint-detail">
    

      <div  onClick={() => navigate(`/admin/complaintdetail/${complaint.id}`)} className="complaint-head-text">
      <div className="to-user-complaint"
        onClick={() =>
          navigate(
            `/admin/userdetail/${state.users.find((user) => user.id === complaint.userId)?.userName}`
          )
        }
      >
        
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
        <p onClick={() => navigate(`/complaintdetail/${complaint.id}`)}>{complaint.complaintContent.slice(0, 150)}</p>
       
      </div>
      <h4 className={complaint.status}>{complaint.status}</h4>

     
    </div>
  </div>
  )
}

export default Complaint