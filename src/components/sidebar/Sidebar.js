/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./sidebar.scss";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { state } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      {state.problems.slice(0, 5).map((problem) => (
        <div key={problem.id} className="sidebar-list-problem">
          <div className="sidebar-user-picture">
            <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
            <h3>
              {state.users.map((user) =>
                user.id === problem.userId ? user.userName : ""
              )}
            </h3>
            
          </div>
          <div className="sidebar-problem-detail">
            <div className="sidebar-problem-head-text">
              <h3>{problem.problemHead}</h3>
              <p>
                {problem.problemContent.slice(0, 50)}
                <a
                  onClick={() => {
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
                    : "🤍"+ problem.likesUserId.length
                  : "🤍" + problem.likesUserId.length}
              </button>
              <button>✉️{problem.commentCount}</button>
              <span>{problem.createDate.substring(0, problem.createDate.indexOf(" "))}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
