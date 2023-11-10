/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./comments.scss";
import image from "../../images/avatar.png";
const Comments = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div id="admin-comment-container">
      {state.comments.map((comment) => (
        <div
          onClick={() => navigate(`/admin/commentdetail/${comment.id}`)}
          key={comment.id}
          className="admin-comment"
        >
          <div className="admin-comment-user-picture">
            <img src={image} />
            <h5>
              {state.users.map((user) =>
                user.id === comment.userId ? user.userName : ""
              )}
            </h5>
          </div>
          <span>{comment.createDate.split(" ")[0]}</span>
          <div className="admin-comment-comment-head-text">
            <h6>{comment.commentContent.slice(0, 150)}...</h6>
          </div>
          <button onClick={(()=>navigate(`/admin/commentdetail/${comment.id}`))}>Problemi Gör</button>
        </div>
      ))}
    </div>
  );
};

export default Comments;
