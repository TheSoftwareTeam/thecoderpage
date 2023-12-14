import React, { useContext } from "react";
import "./complaint.scss";
import UserContext from "../../context/UserContext";
const Complaint = ({problemId,userId}) => {
  const {dispatch,sendComplaint } = useContext(UserContext);

  return (
    <div className="complaint-container">
      <form onSubmit={()=>sendComplaint(problemId,userId)}>
        <button
          className="exit"
          onClick={()=>dispatch({type:"isComplaintPage"})}
        >
          x
        </button>
        <h2>Şikayet Et{problemId}</h2>
        <textarea
          onChange={(e) =>
            dispatch({ type: "complaintTextarea", payload: e.target.value })
          }
          placeholder="Lütfen Şikayet Nedenini Belirtiniz..."
          required
        />
        
        <input type="submit" value="Gönder" />
       
      </form>
    </div>
  );
};

export default Complaint;
