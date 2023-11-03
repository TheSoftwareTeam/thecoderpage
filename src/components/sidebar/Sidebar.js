/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./sidebar.scss";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      {state.problems.map((problem) => (
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
              <button>❤️{problem.likeCount}</button>
              <button>✉️{problem.commentCount}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
