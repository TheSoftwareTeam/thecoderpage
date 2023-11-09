/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./problem-detail.scss";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const { state,getProblemDetail } =
    useContext(DataContext);

  const { id } = useParams();
  

  useEffect(() => {
    getProblemDetail(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div id="detail-container">
      <div id="detail-content">

        <div className="detail-list-problem">
          
          <div className="detail-user-picture">
  
            <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
            <h3>
              {state.users.map((user) =>
                user.id === state.activeProblemDetail.userId
                  ? user.userName
                  : ""
              )}
            </h3>
            <span>{state.activeProblemDetail.createDate}</span>
          </div>
          <div className="detail-problem-detail">
            <div className="detail-problem-head-text">
              <h3>{state.activeProblemDetail.problemHead}</h3>
              <br />
              <p>{state.activeProblemDetail.problemContent}</p>
            </div>

            <div className="detail-problem-comment-view">
              <button>
               💙{state.activeProblemDetail.likesUserId.length}
              </button>

              <button>✉️{state.activeProblemDetail.commentCount}</button>
            </div>
            {state.comments
              .slice()
              .reverse()
              .map((comment) =>
                comment.problemId === state.activeProblemDetail.id ? (
                  <div key={comment.id} className="detail-user-comment">
                    <div className="detail-comment-user-picture">
                      <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
                      <h4>
                        {state.users.map((user) =>
                          user.id === comment.userId ? user.userName : ""
                        )}
                      </h4>
                      <span>{comment.createDate}</span>
                    </div>

                    <p>{comment.commentContent}</p>
                  </div>
                ) : (
                  ""
                )
              )
              
              }
              
          </div>
         
        </div>
         <div className="action">
                <button>Sil</button>
                <button>Güncelle</button>
              </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
