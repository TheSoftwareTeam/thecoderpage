/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./problem-detail.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const { state, deleteProblem, getProblemDetail } = useContext(AdminContext);

  const { id } = useParams();

  useEffect(() => {
    getProblemDetail(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div id="adetail-container">
      <div id="adetail-content">
        <div className="adetail-list-problem">
          <div className="adetail-user-picture">
            {state.users
              .filter((user) => user.id === state.activeProblemDetail.userId)
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
                  <h3>{user.userName}</h3>
                </>
              ))}
            <span>{state.activeProblemDetail.createDate}</span>
          </div>
          <div className="adetail-problem-detail">
            <div className="adetail-problem-head-text">
              <h3>{state.activeProblemDetail.problemHead}</h3>
              <br />
              <p>{state.activeProblemDetail.problemContent}</p>
            </div>

            <div className="adetail-problem-comment-view">
              <button>💙{state.activeProblemDetail.likesUserId.length}</button>

              <button>✉️{state.activeProblemDetail.comments.length}</button>
            </div>
            {state.activeProblemDetail.comments
              .slice()
              .reverse()
              .map((comment) => (
                <div key={comment.id} className="adetail-user-comment">
                  <div className="adetail-comment-user-picture">
                    {state.users
                      .filter((user) => user.id === comment.userId)
                      .map((user) => (
                        <>
                          {user.userPicture ? (
                            <img
                              src={"http://localhost:3001/" + user.userPicture}
                              alt="Admin"
                            />
                          ) : (
                            <img src={image} alt="Admin" />
                          )}
                          <h4>{user.userName}</h4>
                        </>
                      ))}
                    <span>
                      {comment.createDate} <button onClick={""}>Sil</button>
                    </span>
                  </div>

                  <p>{comment.commentContent}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="action">
          <button
            onClick={() => {
              deleteProblem(state.activeProblemDetail.id);
            }}
          >
            Problemi Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
