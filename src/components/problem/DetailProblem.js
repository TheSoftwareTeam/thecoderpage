import React, { useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./detail-problem.scss";
import DataContext from "../../context/DataContext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const DetailProblem = () => {
  const { state, dispatch, writeProblemComment,actionLike } = useContext(DataContext);

  let url = "http://localhost:3005";
  const { id } = useParams();

  const getProblemDetail = async () => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
   await dispatch({ type: "activeProblemDetail", payload: response.data });

  };

  useEffect(() => {
    getProblemDetail();
    
  }, [id]);
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
        {

        }
        <div className="detail-list-problem">
          <div className="detail-user-picture">
            <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
            <h3>
              {state.users.map((user) =>
                user.id === state.activeProblemDetail.userId ? user.userName : ""
              )}
            </h3>
          </div>
          <div className="detail-problem-detail">
            <div className="detail-problem-head-text">
              <h3>{state.activeProblemDetail.problemHead}</h3>
              <br />
              <p>{state.activeProblemDetail.problemContent}</p>
            </div>

            <div className="detail-problem-comment-view">
              <button onClick={()=>actionLike(state.activeProblemDetail.id)}>{state.activeProblemDetail.likesUserId.find((id)=>id===1)?"❤️":"🤍"}
              {state.activeProblemDetail.likesUserId.length}</button>

              {state.problems[0].likesUserId}
              <button>✉️{state.activeProblemDetail.commentCount}</button>
            </div>

            <div className="detail-write-comment">
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
              <button onClick={() => writeProblemComment(state.activeProblemDetail)}>Gönder</button>
            </div>


      {state.comments.slice().reverse().map((comment) =>
              comment.problemId === state.activeProblemDetail.id ? (
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
