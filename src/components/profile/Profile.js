import React from "react";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-content">
        <div className="profile-picture">
          <img
            src="https://media.licdn.com/dms/image/C5603AQE3q1bcRO2i6A/profile-displayphoto-shrink_100_100/0/1625398374451?e=1704326400&v=beta&t=381trX8mwswMBxjGs5Q3bDU-VZEE-yx58wDnlNGXoi8"
            alt="res"
          />
        </div>
        <form>
          <input type="text" placeholder="Kullanıcı adı" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Şifre" />

          <input type="submit" value="Düzenle" />
         
        </form>
      </div>
    </div>
  );
};

export default Profile;
