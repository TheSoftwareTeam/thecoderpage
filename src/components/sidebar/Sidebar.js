/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./sidebar.scss";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import image from "../../images/avatar.png";
const Sidebar = () => {
  const { state,dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      {state.problems.slice(0, 5).map((problem) => (
        <div key={problem.id} className="sidebar-list-problem">
          <div className="sidebar-user-picture">
            {state.users.find((user) => user.id === problem.userId)
              ?.userPicture ? (
              <img
                src={
                  "http://localhost:3001/" +
                  state.users.find((user) => user.id === problem.userId)
                    ?.userPicture
                }
                alt="res"
              />
            ) : (
              <img src={image} alt="res" />
            )}
            <h3>
              {state.users.find((user) => user.id === problem.userId)?.userName}
            </h3>
          </div>
          <div className="sidebar-problem-detail">
            <div className="sidebar-problem-head-text">
              {problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}

              <h3>{problem.problemHead}</h3>
              <p>
                {problem.problemContent.slice(0, 50)}
                <a
                  onClick={() => {
                    dispatch({ type: "selectedCategory", payload: null });
                    navigate(`/home/detailproblem/${problem.id}`);
                  }}
                >
                  ...Daha fazlası
                </a>
              </p>
            </div>

            <div className="sidebar-problem-comment-view">
              <button>
                {state.activeUser !== null
                  ? problem.likesUserId.find((id) => id === state.activeUser.id)
                    ? "❤️" + problem.likesUserId.length
                    : "🤍" + problem.likesUserId.length
                  : "🤍" + problem.likesUserId.length}
              </button>
              <button>✉️{problem.comments.length}</button>
              <span>
                {problem.createDate.substring(
                  0,
                  problem.createDate.indexOf(" ")
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
