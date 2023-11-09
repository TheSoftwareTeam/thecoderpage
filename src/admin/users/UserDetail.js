import React, { useContext, useEffect } from "react";
import "./user-detail.scss";
import DataContext from "../../context/DataContext";
import image from "../../images/avatar.png";
import { useParams } from "react-router-dom";
const UserDetail = () => {
  const { state, getUserDetail } = useContext(DataContext);

  const { username } = useParams();
 console.log(username);
  useEffect(() => {
    console.log(username);
    getUserDetail(username);
    console.log(state.userDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, state.userDetail]);

  return (
    <div className="profile-container">
      <h2>Kullanıcı Bilgileri</h2>
      <div className="profile-content">
        <div className="profile-picture">
          <img src={image} alt="res" />
          <hr />
          <span>
            katılma tarihi:{" "}
            {state.userDetail !== null
              ? state.userDetail.createDate.split(" ")[0]
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
