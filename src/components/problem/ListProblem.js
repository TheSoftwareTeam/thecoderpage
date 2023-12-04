/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";

import "./list-problem.scss";
import { NavLink, useNavigate, } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
const ListProblem = () => {
  const { state, dispatch, actionLike,formatRelativeTime,getMoreProblem,getProblem } = useContext(UserContext);
  const navigate = useNavigate();
  // const { categoryName } = useParams();
  useEffect(() => {
    getProblem()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCategory]);
 
  return (
    <div id="list-container">
      <div id="list-content">
        <div className="list-state">
          <div className="list-text">
            Kod yazarken karşılaştığınız sorunları paylaşın, çözümleri birlikte
            bulalım.
          </div>
          <div className="list-share-button">
            <button>
              <NavLink className="list-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>
        {state.problems.sort((a, b) => {
            const dateA = a.createDate.split(" ")[0].split(".").reverse().join("/") + " " + a.createDate.split(" ")[1];
            const dateB = b.createDate.split(" ")[0].split(".").reverse().join("/") + " " + b.createDate.split(" ")[1];
            return new Date(dateB) - new Date(dateA);
          })
          .filter(
            (problem) =>
              !problem.isDeleted &&
              (problem.categoryId === state.selectedCategory ||
                state.selectedCategory === null)
          ).map((problem) => (
            <div key={problem.id} className="list-problem">
              <div className="list-user-picture">
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
                <span>{formatRelativeTime(problem.createDate)}</span>
              </div>
              <div className="list-problem-detail">
                <div className="list-problem-head-text">
                  <h4>
                    {problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}
                  </h4>

                  <h3> {problem.problemHead}</h3>
                  <p>
                    {problem.problemContent.slice(0, 150)}
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

                <div className="list-problem-comment-view">
                  <button onClick={() => actionLike(problem.id)}>
                    {state.activeUser !== null
                      ? state.problems
                          .find((prob) => prob.id === problem.id)
                          .likesUserId.find((id) => id === state.activeUser.id)
                        ? "❤️" +
                          state.problems.find((prob) => prob.id === problem.id)
                            .likesUserId.length
                        : "🤍" +
                          state.problems.find((prob) => prob.id === problem.id)
                            .likesUserId.length
                      : "🤍" +
                        state.problems.find((prob) => prob.id === problem.id)
                          .likesUserId.length}
                  </button>
                  <button>✉️{problem.comments.length}</button>
                </div>

                {problem.comments.sort((a, b) => {
                  const dateA = a.createDate.split(" ")[0].split(".").reverse().join("/") + " " + a.createDate.split(" ")[1];
                  const dateB = b.createDate.split(" ")[0].split(".").reverse().join("/") + " " + b.createDate.split(" ")[1];
                  return new Date(dateB) - new Date(dateA);
                }).slice(0, 2).map((comment) => (
                  <div key={comment.id} className="list-user-comment">
                    <div className="list-comment-user-picture">
                      {state.users.find((user) => user.id === comment.userId)
                        ?.userPicture ? (
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
          ))}

        {
          state.loadMoreButton&& (
            <button
              onClick={ async() =>  getMoreProblem()}
              className="list-load-more"
            >
              Daha Fazla
            </button>
          )
          }


        {state.problems.length ===0 &&
          <div className="no-problem">
            <div className="list-user-picture">
              <img src={image} alt="res" />
              <h3>Bu kategoride henüz problem paylaşılmamış.</h3>
            </div>
          </div>
          
          }
      </div>
    </div>
  );
};

export default ListProblem;
