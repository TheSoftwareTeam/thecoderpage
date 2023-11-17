import React, { useContext, useEffect } from "react";
import "./profile.scss";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
const Profile = () => {
  const { state, dispatch, editProfile, handleFileUpload } =
    useContext(UserContext);

  useEffect(() => {
    if (state.activeUser !== null) {
      dispatch({ type: "profileName", payload: state.activeUser.name });
      dispatch({ type: "profileSurname", payload: state.activeUser.surName });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeUser]);

  return (
    <div className="profile-container">
      <h2>Profil</h2>
      <div className="profile-content">
        <div className="profile-picture">
          {state.activeUser && state.activeUser.userPicture ? (
            <img
              src={"http://localhost:3001/" + state.activeUser.userPicture}
              alt="res"
            />
          ) : (
            <img src={image} alt="res" />
          )}

          <input type="file" name="file" onChange={handleFileUpload} />

          <hr />
          <span>
            katılma tarihi:{" "}
            {state.activeUser !== null
              ? state.activeUser.createDate.split(" ")[0]
              : ""}
          </span>
        </div>
        <form onSubmit={editProfile}>
          <input
            onChange={(e) =>
              dispatch({ type: "profileName", payload: e.target.value })
            }
            type="text"
            placeholder="Ad"
            value={state.profileName}
            required
          />

          <input
            onChange={(e) =>
              dispatch({ type: "profileSurname", payload: e.target.value })
            }
            type="text"
            placeholder="Soyad"
            value={state.profileSurname}
            required
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
          <input type="submit" value="Düzenle" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
