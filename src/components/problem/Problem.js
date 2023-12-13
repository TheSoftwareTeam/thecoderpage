/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import Complaint from "../complaint/Complaint";
import { useNavigate, useParams } from "react-router-dom";
import "./scss/problem.scss";
import Comment from "./Comment";
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
  useEffect(() => {
    dispatch({ type: "newProblemComment", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeProblemDetail]);

  useEffect(() => {
    state.isComplaintPage
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [state.isComplaintPage]);
  return (
    <div key={problem.id} className="problem">
      {state.isComplaintPage && <Complaint problemId={problem.id} />}

      {id && problem.userId !== state.activeUser.id && (
        <a onClick={() => dispatch({ type: "isComplaintPage" })}>Şikayet et</a>
      )}

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
      <div className={`problem-detail ${state.loadMoreButton ? 'open' : ''}`}>
        <div className="problem-head-text">
          <h4>{problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}</h4>
          <h3> {problem.problemHead}</h3>
          <p onClick={() => {
            dispatch({ type: "selectedCategory", payload: null });
            navigate(`/home/detailproblem/${problem.id}`);
          }}>
            {id ? (
              problem.problemContent
            ) : (
              <>
                {problem.problemContent.slice(0, 150) + "..."}
                <p className="click-to-detail" >Detayı görmek için tıklayınız.</p>
              </>
            )}
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

          {userName &&
          state.activeUser &&
          state.activeProblemDetail.userId === state.activeUser.id &&
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
        {id && (
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

        {!id &&
          problem.comments
            .sort((a, b) => {
              const dateA = new Date(a.createDate);
              const dateB = new Date(b.createDate);
              return dateB - dateA;
            })
            .slice(0, 2)
            .map((comment) => <Comment comment={comment} />)}

        {id &&
          problem.comments
            .sort((a, b) => {
              const dateA = new Date(a.createDate);
              const dateB = new Date(b.createDate);
              return dateB - dateA;
            })
            .map((comment) => <Comment comment={comment} />)}

        {!id && problem.comments.length >= 3 ? (
          <p className="more-comments-p">
            +{problem.comments.length - 2} yorum daha{" "}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Problem;
