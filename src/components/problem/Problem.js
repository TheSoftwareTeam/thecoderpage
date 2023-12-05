/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import { useNavigate, useParams } from "react-router-dom";
import "./scss/problem.scss";
const Problem = ({ problem }) => {
  const { userName } = useParams();
  const { id } = useParams();

  const {
    state,
    dispatch,
    actionLike,
    formatRelativeTime,
    handleCompletedProblem,
    writeProblemComment,
  } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div key={problem.id} className="problem">
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
        <h3
          onClick={() =>
            navigate(
              `/home/profile/${
                state.users.find((user) => user.id === problem.userId)?.userName
              }/detail`
            )
          }
        >
          {state.users.find((user) => user.id === problem.userId)?.userName}
        </h3>
        <span>{formatRelativeTime(problem.createDate)}</span>
      </div>
      <div className="problem-detail">
        <div className="problem-head-text">
          <h4>{problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}</h4>

          <h3> {problem.problemHead}</h3>
          <p>
            {problem.problemContent}
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

        <div className="problem-comment-view">
          <button onClick={() => actionLike(problem.id)}>
            {state.activeUser !== null
              ? problem.likesUserId.find((id) => id === state.activeUser.id)
                ? "❤️"
                : "🤍"
              : "🤍"}
            {problem.likesUserId.length}
          </button>
          <button>✉️{problem.comments.length}</button>

          {(userName ||
            state.activeProblemDetail.userId === state.activeUser.id) &&
          state.activeUser !== null &&
          state.activeUser.id === problem.userId ? (
            <span
              className="completed-button "
              onClick={() => handleCompletedProblem(problem.id)}
            >
              {" "}
              {problem.isCompleted === false
                ? "✅ Çözüldü olarak işaretle"
                : "❌ Çözülmedi olarak işaretle"}
            </span>
          ) : (
            ""
          )}
        </div>
        {(userName || id) && (
          <div className="problem-write-comment">
            <textarea
              value={state.newProblemComment}
              onChange={(e) =>
                dispatch({
                  type: "newProblemComment",
                  payload: e.target.value,
                })
              }
              placeholder="Yorum yaz.."
            />
            <button
              disabled={state.newProblemComment.trim().length < 5}
              onClick={() => writeProblemComment(state.activeProblemDetail)}
            >
              Gönder
            </button>
          </div>
        )}

        {problem.comments
          .sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
          })
          .slice(0, 2)
          .reverse()
          .map((comment) => (
            <div key={comment.id} className="user-comment">
              <div className="comment-user-picture">
                {state.users.find((user) => user.id === comment.userId)
                  ?.userPicture ? (
                  <img
                    src={
                      "http://localhost:3001/" +
                      state.users.find((user) => user.id === comment.userId)
                        ?.userPicture
                    }
                    alt="res"
                  />
                ) : (
                  <img src={image} alt="res" />
                )}
                <h4
                  onClick={() =>
                    navigate(
                      `/home/profile/${
                        state.users.find((user) => user.id === comment.userId)
                          ?.userName
                      }/detail`
                    )
                  }
                >
                  {
                    state.users.find((user) => user.id === comment.userId)
                      ?.userName
                  }
                </h4>
                <span>{formatRelativeTime(comment.createDate)}</span>
              </div>
              <p>{comment.commentContent}</p>
            </div>
          ))}
        <p>
          {problem.comments.length >= 3
            ? `+ ${problem.comments.length - 2} yorum daha`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Problem;
