/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./detail-problem.scss";
import DataContext from "../../context/DataContext";
import { NavLink } from "react-router-dom";

const DetailProblem = () => {
  const { state, dispatch, writeProblemComment } =
    useContext(DataContext);
  const veri = state.problemDetailPage;


  return (
    <div id="detail-container">
      <div id="detail-content">
        <div className="detail-aciklama">
          <div className="detail-text">
            Açıklama Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy
          </div>
          <div className="detail-share-button">
            <button>
              <NavLink className="detail-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>
        {}
        <div className="detail-list-problem">
          <div className="detail-user-picture">
            <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
            <h3>
              {state.users.map((user) =>
                user.id === veri.userId ? user.userName : ""
              )}
            </h3>
          </div>
          <div className="detail-problem-detail">
            <div className="detail-problem-head-text">
              <h3>{veri.problemHead}</h3>
              <br />
              <p>{veri.problemContent}</p>
            </div>

            <div className="detail-problem-comment-view">
              <button>❤️{veri.likeCount}</button>
              <button>✉️{veri.commentCount}</button>
            </div>

            <div className="detail-write-comment">
              <textarea
                value={state.commentContent}
                onChange={(e) =>
                  
                  dispatch({
                    type: "newProblemComment",
                    payload: e.target.value,
                  })
                }
                placeholder="Yorum yaz.."
              />
              <button onClick={()=>writeProblemComment(veri)}>Gönder</button>
            </div>

            {state.comments.map((comment) =>
              comment.problemId === veri.id ? (
                <div key={comment.id} className="detail-user-comment">
                  <div className="detail-comment-user-picture">
                    <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
                    <h4>
                      {state.users.map((user) =>
                        user.id === comment.userId ? user.userName : ""
                      )}
                    </h4>
                  </div>

                  <p>{comment.commentContent}</p>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default DetailProblem;
