import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import "./profile-detail.scss";
const ProfileDetail = () => {
  const { state, dispatch, handleFileUpload, formatRelativeTime } =
    useContext(UserContext);
  return (
    <div id="profile-detail-container">
      <div className="profile-picture">
        {state.activeUser && state.activeUser.userPicture ? (
          <img
            src={"http://localhost:3001/" + state.activeUser.userPicture}
            alt="res"
          />
        ) : (
          <img src={image} alt="res" />
        )}

        <label for="file-upload" name="file">
          Resim seç
        </label>
        <input id="file-upload" type="file" onChange={handleFileUpload} />
        <h6>Seçilen resim: {state.activeUser.userPicture.split("/")[1]}</h6>
      </div>

      <form>
        <input
          type="text"
          placeholder="Ad"
          value={state.profileName}
          minLength={2}
          maxLength={20}
          readOnly
        />

        <input
          type="text"
          placeholder="Soyad"
          value={state.profileSurname}
          minLength={2}
          maxLength={20}
          readOnly
        />

        <input
          type="text"
          value={state.activeUser !== null ? state.activeUser.userName : ""}
          readOnly
        />
        <input
          type="email"
          value={state.activeUser !== null ? state.activeUser.email : ""}
          readOnly
        />
        <input
          type="text"
          value={state.activeUser !== null ? state.activeUser.createDate : ""}
          readOnly
        />

        <input type="text" value="problem Sayısı: 20" readOnly />

        <input type="text" value="Verdiği Yanıt Sayısı: 90" readOnly />

        <input type="text" value="Aldığı Beğeni Sayıs: 465" readOnly />
      </form>
    </div>
  );
};

export default ProfileDetail;
