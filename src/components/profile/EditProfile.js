import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext';
import image from "../../images/avatar.png";
import "./scss/edit-profile.scss";
const EditProfile = () => {
    const { state, dispatch, editProfile, handleFileUpload,formatRelativeTime } =
    useContext(UserContext);
    useEffect(() => {
       
      dispatch({ type: "profilePicture", payload: state.activeUser.userPicture });
   
}
// eslint-disable-next-line react-hooks/exhaustive-deps
, [state.activeUser&&state.activeUser.userPicture]);
  return (
    <div id='edit-profile-container'>

       <div className="profile-picture">
          {state.activeUser && state.activeUser.userPicture ? (
            <img
              src={"http://localhost:3001/" + state.activeUser.userPicture}
              alt="res"
            />
          ) : (
            <img src={image} alt="res" />
          )}

          <label htmlFor="file-upload" name="file">
            Resim seç
          </label>
          <input
            id="file-upload"
            type="file"

            onChange={handleFileUpload}
          />
         <h6>Seçilen resim: {state.activeUser && state.activeUser.userPicture.split("/")[1]}</h6>
          
          
          <hr />
          <span>
            katılma tarihi: {" "}
            {state.activeUser && formatRelativeTime(state.activeUser.createDate)}
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
            minLength={2}
            maxLength={20}
            required
          />

          <input
            onChange={(e) =>
              dispatch({ type: "profileSurname", payload: e.target.value })
            }
            type="text"
            placeholder="Soyad"
            value={state.profileSurname}
            minLength={2}
            maxLength={20}
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
  )
}

export default EditProfile