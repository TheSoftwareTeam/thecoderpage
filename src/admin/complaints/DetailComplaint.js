/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/detail-complaint.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useNavigate, useParams } from "react-router-dom";

const DetailComplaint = () => {
  const {
    state,
    dispatch,
    formatRelativeTime,
    getComplaintDetail,
    ubdateComplaint,
  } = useContext(AdminContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getComplaintDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div id="detail-complaint-container">
      <div id="detail-complaint-content">
        <div className="list-complaint">
          <div className="complaint-user-picture">
            {state.users
              .filter((user) => user.id === state.complaintDetail.userId)
              .map((user) => (
                <>
                  {user.userPicture ? (
                    <img
                      src={"http://localhost:3001/" + user.userPicture}
                      alt="User"
                    />
                  ) : (
                    <img src={image} alt="Admin" />
                  )}
                  <h3
                    onClick={() =>
                      navigate(`/admin/userdetail/${user.userName}`)
                    }
                  >
                    {user.userName}
                  </h3>
                </>
              ))}
            <span>{formatRelativeTime(state.complaintDetail.createDate)}</span>
          </div>
          <div className="adetail-complaint-detail">
            <div className="adetail-complaint-head-text">
              <br />
              <p>{state.complaintDetail.complaintContent}</p>
            </div>
          
          </div>
        </div>
        <div className="action">
          <select
            value={state.complaintStatus}
            onChange={(e) =>
              dispatch({
                type: "complaintStatus",
                payload: e.target.value,
              })
            }
          >
            <option value="submitted">Alındı</option>
            <option value="inProgress">İşleniyor</option>
            <option value="resolved">Çözüldü</option>
          </select>
          <button onClick={() => ubdateComplaint(state.complaintDetail)}>
            Durumu Güncelle
          </button>
        </div>
      </div>
      <button
        className="to-ptoblem"
        onClick={() =>
          navigate(`/admin/problemdetail/${state.complaintDetail.problemId}`)
        }
      >
        Probleme Git
      </button>
      <button
        className="to-user"
        
      >
            {state.users
              .filter((user) => user.id === state.complaintDetail.toUserId)
              .map((user) => (
                <>
                  {user.userPicture ? (
                    <img
                      src={"http://localhost:3001/" + user.userPicture}
                      alt="User"
                    />
                  ) : (
                    <img src={image} alt="Admin" />
                  )}
                  <h3
                    onClick={() =>
                      navigate(`/admin/userdetail/${user.userName}`)
                    }
                  >
                    {user.userName}
                  </h3>
                </>
              ))}
      </button>
    </div>
  );
};

export default DetailComplaint;
