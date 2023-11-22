/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./comments.scss";
import image from "../../images/avatar.png";
import AdminContext from "../../context/AdminContext";
const Comments = () => {
  const { state } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div id="admin-comment-container">
      {state.problems.map(
  (problem) =>
    problem.isDeleted === false &&
    problem.comments
      .sort((a, b) =>  new Date(a.createDate) - new Date(b.createDate))
      .map((comment) => (
            <div
              //onClick={() => navigate(`/admin/commentdetail/${comment.id}`)}
              key={comment.id}
              className="admin-comment"
            >
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
                      <h5>{user.userName}</h5>
                    </>
                  ))}
                    <span>{comment.createDate.split(" ")[0]}</span>
              </div>
            
              <div className="admin-comment-head-text">
                <h6>{comment.commentContent.slice(0, 150)}...</h6>
              </div>
              <button
                onClick={() => navigate(`/admin/problemdetail/${problem.id}`)}
              >
                Problemi Gör
              </button>
              <button
                onClick={() => navigate(`/admin/userdetail/${comment.userId}`)}
              >
                Kullanıcı
              </button>
              <button onClick={""}>Sil</button>
            </div>
          ))
      )}
    </div>
  );
};

export default Comments;
