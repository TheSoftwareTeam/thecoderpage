import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import image from "../../images/avatar.png";
import "./scss/comment.scss";
const Comment = ({ comment, problem }) => {
  const { state,  formatRelativeTime } = useContext(AdminContext);
  const navigate = useNavigate();

  return (
    <div className="admin-comment">
      <div className="admin-comment-user-picture">
        {state.users
          .filter((user) => user.id === comment.userId)
          .map((user) => (
            <>
              {user.userPicture ? (
                <img
                  src={"http://localhost:3001/" + user.userPicture}
                  alt="User"
                />
              ) : (
                <img src={image} alt="User" />
              )}
              <h5
                onClick={() => navigate(`/admin/userdetail/${user.userName}`)}
              >
                {user.userName}
              </h5>
            </>
          ))}
        <span>{formatRelativeTime(comment.createDate)}</span>
      </div>

      <div
        onClick={() =>
          navigate(`/admin/commentdetail/${problem.id + "/" + comment.id}`)
        }
        className="admin-comment-head-text"
      >
        <h6>{comment.commentContent.slice(0, 150)}...</h6>
      </div>
      <div className="control-button">
        <button onClick={() => navigate(`/admin/problemdetail/${problem.id}`)}>
          Problem
        </button>

        <button onClick={""}>Sil</button>
      </div>
    </div>
  );
};

export default Comment;
