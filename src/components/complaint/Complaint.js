import React, { useContext, useEffect, useState } from "react";
import "./complaint.scss";
import { FaRegWindowClose } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import axios from "axios";
const Complaint = ({ problemId, userId }) => {
  const { dispatch, sendComplaint } = useContext(UserContext);
  let url = "http://localhost:3005";

  const [user, setUser] = useState({});
  const getUser = async () => {
    const response = await axios.get(`${url}/users/${userId}`);
    setUser(await response.data);
  };
  useEffect(
    () => {
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="complaint-container">
      <form onSubmit={() => sendComplaint(problemId, userId)}>
        <button
          className="exit"
          onClick={() => dispatch({ type: "isComplaintPage" })}
        >
          <FaRegWindowClose size={25} />
        </button>
        <h2>({user.userName}) Şikayet Et</h2>
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
