/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./user-problems.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
const UserProblem = () => {
  const { userName } = useParams();

  const { state, actionLike, activeUserProblem, handleCompletedProblem } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    activeUserProblem(userName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, state.selectedCategory]);

  return (
    <div id="user-container">
      <div id="user-content">
        <div className="user-aciklama">
          <div className="user-text">
            Açıklama Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy
          </div>
          <div className="user-share-button">
            <button>
              <NavLink className="user-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>

        {state.activeUserProblem.length === 0 ? (
          <h1>Kullanıcı henüz problem paylaşmamış</h1>
        ) : (
          state.activeUserProblem.map(
            (problem) =>
              !problem.isDeleted &&
              (problem.categoryId === state.selectedCategory ||
              state.selectedCategory === null ? (
                <div key={problem.id} className="user-problem">
                  <div className="user-user-picture">
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
                      {
                        state.users.find((user) => user.id === problem.userId)
                          ?.userName
                      }
                    </h3>
                    <span>{problem.createDate}</span>
                  </div>
                  <div className="user-problem-detail">
                    <div className="user-problem-head-text">
                      <h4>
                        {problem.isCompleted
                          ? "✅ Çözüldü"
                          : "❌ Çözüm aranıyor"}
                      </h4>
                      <h3>{problem.problemHead}</h3>
                      <p>
                        {problem.problemContent.slice(0, 150)}
                        <a
                          onClick={() => {
                            navigate(`/home/detailproblem/${problem.id}`);
                          }}
                        >
                          ...Daha fazlası
                        </a>
                      </p>
                    </div>

                    <div className="user-problem-comment-view">
                      <button onClick={() => actionLike(problem.id)}>
                        {state.activeUser !== null
                          ? state.problems
                              .find((prob) => prob.id === problem.id)
                              .likesUserId.find(
                                (id) => id === state.activeUser.id
                              )
                            ? "❤️" +
                              state.problems.find(
                                (prob) => prob.id === problem.id
                              ).likesUserId.length
                            : "🤍" +
                              state.problems.find(
                                (prob) => prob.id === problem.id
                              ).likesUserId.length
                          : "🤍" +
                            state.problems.find(
                              (prob) => prob.id === problem.id
                            ).likesUserId.length}
                      </button>
                      <button>✉️{problem.comments.length}</button>
                      <button
                        className="completed-button "
                        onClick={() => handleCompletedProblem(problem.id)}
                      >
                        {" "}
                        {problem.isCompleted === false
                          ? "✅ Çözüldü olarak işaretle"
                          : "❌ Çözülmedi olarak işaretle"}
                      </button>
                    </div>

                    {problem.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="user-user-comment">
                        <div className="user-comment-user-picture">
                          {state.users.find(
                            (user) => user.id === comment.userId
                          )?.userPicture ? (
                            <img
                              src={
                                "http://localhost:3001/" +
                                state.users.find(
                                  (user) => user.id === comment.userId
                                )?.userPicture
                              }
                              alt="res"
                            />
                          ) : (
                            <img src={image} alt="res" />
                          )}
                          <h4>
                            {
                              state.users.find(
                                (user) => user.id === comment.userId
                              )?.userName
                            }
                          </h4>
                          <span>{comment.createDate}</span>
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
              ) : (
                ""
              ))
          )
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default UserProblem;
