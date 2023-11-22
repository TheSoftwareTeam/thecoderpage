
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
              {state.users
                .filter((user) => user.id === problem.userId)
                .map((user) => (
                  <>
                    {user.userPicture ? (
                      <img
                        src={"http://localhost:3001/" + user.userPicture}
                        alt="User"
                      />
                    ) : (
                      <img src={image} alt="User" />
                    )}
                    <h5>{user.userName}</h5>
                  </>
                ))}          <span>{problem.createDate.split(" ")[0]}</span>
              </div>
    
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
                  <button>✉️{problem.comments.length}</button>
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
