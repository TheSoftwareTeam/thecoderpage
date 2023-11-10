/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import "./problems.scss";
import image from "../../images/avatar.png";
const Problems = () => {
  const { state } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div id="admin-container">

      <div id="problem-list">

      {state.problems.map(
        (problem) =>
          !problem.isDeleted && (
            <div
              onClick={() => navigate(`/admin/problemdetail/${problem.id}`)}
              key={problem.id}
              className="admin-problem"
            >
              <div className="admin-user-picture">
                <img src={image} />
                <h4>
                  {state.users.map((user) =>
                    user.id === problem.userId ? user.userName : ""
                  )}
                </h4>
              </div>
              <span>{problem.createDate.split(" ")[0]}</span>
              <div className="admin-problem-detail">
                <div className="admin-problem-head-text">
                  <h6>{problem.problemHead.slice(0, 150)}</h6>
                </div>

                <div className="admin-problem-comment-view">
                  <button>
                    💙
                    {
                      state.problems.find((prob) => prob.id === problem.id)
                        .likesUserId.length
                    }
                  </button>
                  <button>✉️{problem.commentCount}</button>
                </div>
              </div>
            </div>
          )
      )}
      </div>
     
    </div>
  );
};

export default Problems;
