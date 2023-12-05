import React, { useContext, useEffect } from "react";
import "./scss/user-detail.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useParams } from "react-router-dom";
const UserDetail = () => {
  const { state, getUserDetail, dispatch, editUser } = useContext(AdminContext);

  const { id } = useParams();
  useEffect(() => {
    getUserDetail(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="user-profile-container">
      <h2>Kullanıcı Bilgileri</h2>
      <div className="user-profile-content">
        <div className="user-profile-picture">
         
          {state.userDetail.userPicture !== "" ? (
            <img
              src={"http://localhost:3001/" + state.userDetail.userPicture}
              alt="User"
            />
          ) : (
            <img src={image} alt="User" />
          )}
          

          <hr />
          {/* <span>
            katılma tarihi:{" "}
            {state.userDetail !== null
              ? state.userDetail.createDate.split(" ")[0]
              : ""}
          </span> */}
        </div>
        <form onSubmit={editUser}>
          <input
            onChange={(e) =>
              dispatch({ type: "userName", payload: e.target.value })
            }
            type="text"
            placeholder="Ad"
            value={state.userName}
            required
          />
          <input
            onChange={(e) =>
              dispatch({ type: "userSurname", payload: e.target.value })
            }
            type="text"
            placeholder="Soyad"
            value={state.userSurname}
            required
          />
          <input
            onChange={(e) =>
              dispatch({ type: "userUserName", payload: e.target.value })
            }
            type="text"
            placeholder="Kullanıcı Adı"
            value={state.userUserName}
            required
          />
          <input
            onChange={(e) =>
              dispatch({ type: "userEmail", payload: e.target.value })
            }
            type="email"
            placeholder="E-mail"
            value={state.userEmail}
            required
          />
          <select
            onChange={(e) =>
              dispatch({ type: "userRol", payload: e.target.value })
            }
            value={state.userRol}
          >
            <option value="">Rol Seçiniz</option>
            <option value="admin">Yönetici</option>
            <option value="user">Kullanıcı</option>
          </select>
          <input type="submit" value="Düzenle" />
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
