import React, { useContext } from "react";
import "./profile.scss";
import DataContext from "../../context/DataContext";

const Profile = () => {
  const { state,dispatch } = useContext(DataContext);
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-content">
        <div className="profile-picture">
          <img
            src="https://media.licdn.com/dms/image/C5603AQE3q1bcRO2i6A/profile-displayphoto-shrink_100_100/0/1625398374451?e=1704326400&v=beta&t=381trX8mwswMBxjGs5Q3bDU-VZEE-yx58wDnlNGXoi8"
            alt="res"
          />
          <button>✚</button>
        </div>
        <form>
          <input onChange={(e)=>dispatch({type:"profileName",payload:e.target.value})} type="text" placeholder="Ad" value={state.activeUser.name===""?state.profileName:state.activeUser.name}/>

          <input onChange={(e)=>dispatch({type:"profileSurname",payload:e.target.value})}  type="text" placeholder="Soyad" value={state.activeUser.surName===""?state.profileSurname:state.activeUser.surName}/>
          <input type="text" value={state.activeUser.userName} readOnly/>
          <input type="email" value={state.activeUser.email} readOnly/>
          <input type="submit"  value="Edit Profile" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
