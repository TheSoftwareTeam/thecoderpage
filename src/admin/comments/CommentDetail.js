/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/comment-detail.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useParams } from "react-router-dom";

const CommentDetail = () => {
  const { state, deleteComment, getCommentDetail } = useContext(AdminContext);

  const { problemId,commentId } = useParams();

  useEffect(() => {
    getCommentDetail(problemId,commentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId, problemId]);
  return (
    <div id="adetail-container">
      <div id="adetail-content">
        <div className="adetail-list-problem">
          <div className="adetail-user-picture">
            {state.users
              .filter((user) => user.id === state.activeCommentDetail.userId)
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
            <span>{state.activeCommentDetail.createDate}</span>
          </div>
          <div className="adetail-problem-detail">
            <div className="adetail-problem-head-text">
              <h3>{state.activeCommentDetail.problemHead}</h3>
              <br />
              <p>{state.activeCommentDetail.problemContent}</p>
            </div>

           
          </div>
        </div>
        <div className="action">
          <button
            onClick={() => {
              deleteComment(state.activeCommentDetail.id);
            }}
          >
            Yorumu Sil
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentDetail