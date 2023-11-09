import React, { useContext, useEffect } from "react";
import "./user-detail.scss";
import DataContext from "../../context/DataContext";
import image from "../../images/avatar.png";
import { useParams } from "react-router-dom";
const UserDetail = () => {
  const { state, getUserDetail,dispatch,editProfile } = useContext(DataContext);

  const { username } = useParams();
  useEffect(() => {
    getUserDetail(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="profile-container">
      <h2>Kullanıcı Bilgileri</h2>
      <div className="profile-content">
        <div className="profile-picture">
          <img
            src={image}
            alt="res"
          />
          <hr/>
          <span>katılma tarihi: {state.activeUser!==null?state.activeUser.createDate.split(' ')[0]:""}</span>
        </div>
        <form onSubmit={editProfile}>

          <input onChange={(e)=>dispatch({type:"profileName",payload:e.target.value})} type="text"  placeholder="Ad" value={state.profileName} required/>

          <input onChange={(e)=>dispatch({type:"profileSurname",payload:e.target.value})}  type="text" placeholder="Soyad" value={state.profileSurname} required/>

           <input type="text" value={state.activeUser!==null?state.activeUser.userName:""} readOnly/>
          <input type="email" value={state.activeUser!==null?state.activeUser.email:""}  readOnly/>
          <input type="submit"  value="Düzenle" />
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
