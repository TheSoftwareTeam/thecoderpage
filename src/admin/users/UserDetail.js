import React, { useContext, useEffect, useState } from "react";
import "./scss/user-detail.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useNavigate, useParams } from "react-router-dom";
const UserDetail = () => {
  const { state, getUserDetail, dispatch, editUser,formatRelativeTime} = useContext(AdminContext);
  const [actionDropdown, setActionDropdown] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUserDetail(userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <div className="user-profile-container">
      <h2>Kullanıcı Bilgileri</h2>
      <div className="button-container">
     

        <button 
        onMouseEnter={()=>setActionDropdown(true)}
        onMouseLeave={()=>setActionDropdown(false)}>
          Kullanıcı Aksiyonlarını Gör
         <div className={actionDropdown?"action-dropdown":"hidden-action-dropdown"}>
        <button
          onClick={(e) => {
            e.preventDefault();

            dispatch({
              type: "fltProblemUserName",
              payload: state.userDetail.userName,
            });
            navigate("/admin/problems");
          }}
        >
          Paylaşılan Problemler
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            dispatch({
              type: "fltrComplaintUserName",
              payload: state.userDetail.userName,
            });
            navigate("/admin/complaints");
          }}
        >
          Ettiği Şikayetler
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            dispatch({
              type: "fltrComplaintToUserName",
              payload: state.userDetail.userName,
            });
            navigate("/admin/complaints");
          }}
        >
          Yapılan Şikayetler
        </button>
          </div>
        </button>

      </div>

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
           <span>
          katılma tarihi: {" "}
          {formatRelativeTime(state.userDetail.createDate)}
        </span>
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

          <select
            onChange={(e) => {
              window.confirm(
                `Kullanıcıyı ${
                  e.target.value === "true" ? "Aktif" : "Pasif"
                } yapmak istediğinize emin misiniz?`
              ) && dispatch({ type: "userIsActive", payload: e.target.value });
            }}
            value={state.userIsActive}
          >
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>

          <input type="submit" value="Düzenle" />
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
