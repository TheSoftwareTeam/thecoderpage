import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "./profile-detail.scss";
import { useParams } from "react-router-dom";
const ProfileDetail = () => {
  const { state, getProfilDetail } = useContext(UserContext);
  const { userName } = useParams();
  useEffect(() => {
    getProfilDetail(userName.toLowerCase());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);
  return (
    <div id="profile-detail-container">
      <form>
        <input type="text" value={state.profileDetail.name} readOnly />

        <input type="text" value={state.profileDetail.surName} readOnly />

        <input type="text" value={state.profileDetail.userName} readOnly />
        <input type="text" value={state.profileDetail.email} readOnly />
      </form>
      <form>
        <input type="text" value={state.profileDetail.createDate} readOnly />

        <input
          type="text"
          value={`Problem Sayısı: ${state.profileDetail.problemCount}`}
          readOnly
        />

        <input type="text" value="Verdiği Yanıt Sayısı: 20" readOnly />

        <input type="text" value="Aldığı Beğeni Sayısı: 465" readOnly />
      </form>
    </div>
  );
};

export default ProfileDetail;
