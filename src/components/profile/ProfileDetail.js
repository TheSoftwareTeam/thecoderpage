import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "./scss/profile-detail.scss";
import { useParams } from "react-router-dom";
const ProfileDetail = () => {
  const { state, getProfilDetail, formatRelativeTime } =
    useContext(UserContext);
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
        <input type="text" value={state.profileDetail.userName} readOnly />{" "}
      </form>
      <form>
        <input type="text" value={state.profileDetail.email} readOnly />
        <input
          type="text"
          value={formatRelativeTime(state.profileDetail.createDate)}
          readOnly
        />
        <input
          type="text"
          value={`Problem Sayısı: ${state.profileDetail.problemCount}`}
          readOnly
        />
      </form>
    </div>
  );
};

export default ProfileDetail;
