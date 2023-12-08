import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import image from "../../images/avatar.png";
import "./scss/problem.scss";

const Problem = ({ problem }) => {
  const { state, dispatch, actionLike } =
    useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "newProblemComment", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeProblemDetail]);

  return (
    <div
     
      className="admin-problem"
    >
      <div className="user-picture">
        {state.users.find((user) => user.id === problem.userId)?.userPicture ? (
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
        <h5
          onClick={() =>
            navigate(
              `/admin/userdetail/${state.users.find((user) => user.id === problem.userId)?.userName}`
            )
          }
        >
          {state.users.find((user) => user.id === problem.userId)?.userName}
        </h5>
          <span>{problem.isCompleted ? "✅ Çözüldü" : "❌ Çözülmedi"}</span>
      </div>

      <div className="problem-detail">
        <div  onClick={() => navigate(`/admin/problemdetail/${problem.id}`)} className="problem-head-text">
          
          <h6>{problem.problemHead.slice(0, 150)}</h6>
        </div>

        <div className="problem-comment-view">
          <button onClick={() => actionLike(problem.id)}>
            
            {"💙"+problem.likesUserId.length}
          </button>
          <button>✉️{problem.commentCount}</button>
        </div>
      </div>
    </div>
  );
};

export default Problem;
