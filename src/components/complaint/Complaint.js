import React, { useContext, useEffect } from "react";
import "./complaint.scss";
import UserContext from "../../context/UserContext";
const Complaint = () => {
  const { dispatch, state } = useContext(UserContext);
useEffect(()=>{
    dispatch({type:"complaintTextarea",payload:""})
    state.isComplaintPage?
    document.body.style.overflow = 'hidden'
    :document.body.style.overflow = 'unset'
    },[state.isComplaintPage])
  return (
    <div className="complaint-container">
      <form>
        <button
          className="exit"
          onClick={()=>dispatch({type:"isComplaintPage"})}
        >
          x
        </button>
        <h2>Şikayet Et</h2>
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
