/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/comment-detail.scss";
import AdminContext from "../../context/AdminContext";
import image from "../../images/avatar.png";
import { useNavigate, useParams } from "react-router-dom";

const CommentDetail = () => {
  const { state, deleteComment, getCommentDetail,formatRelativeTime } = useContext(AdminContext);

  const { problemId,commentId } = useParams();
  const navigate = useNavigate();

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
                  <h3
          onClick={() =>
            navigate(
              `/admin/userdetail/${user.userName}`
            )
          }
        >
         {user.userName}
        </h3>
                </>
              ))}
            <span>{formatRelativeTime(state.activeCommentDetail.createDate)}</span>
          </div>
          <div className="adetail-problem-detail">
            <div className="adetail-problem-head-text">
              <p>{state.activeCommentDetail.commentContent}</p>
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