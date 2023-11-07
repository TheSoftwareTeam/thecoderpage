import React, { useContext, useEffect } from "react";
import "./profile.scss";
import DataContext from "../../context/DataContext";
import image from"../../images/avatar.png";
const Profile = () => {
  const { state,dispatch,editProfile,handleImageChange } = useContext(DataContext);
  
useEffect(()=>{

  if(state.activeUser !== null){
    dispatch({type:"profileName",payload: state.activeUser.name})
    dispatch({type:"profileSurname",payload: state.activeUser.surName})
    }
  
},[state.activeUser])
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-content">
        <div className="profile-picture">
          <img
            src={image}
            alt="res"
          />
        </div>
        <form onSubmit={editProfile}>

          <input onChange={(e)=>dispatch({type:"profileName",payload:e.target.value})} type="text"  placeholder="Ad" value={state.profileName} required/>

          <input onChange={(e)=>dispatch({type:"profileSurname",payload:e.target.value})}  type="text" placeholder="Soyad" value={state.profileSurname} required/>

           <input type="text" value={state.activeUser!==null?state.activeUser.userName:""} readOnly/>
          <input type="email" value={state.activeUser!==null?state.activeUser.email:""}  readOnly/>
          <input type="submit"  value="Edit Profile" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
