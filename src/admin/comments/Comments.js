/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import "./scss/comments.scss";
import AdminContext from "../../context/AdminContext";
import Comment from "./Comment";
const Comments = () => {
  const { state } = useContext(AdminContext);
  return (
    <div id="admin-comment-container">
      {state.problems.map(
  (problem) =>
    problem.isDeleted === false &&
    problem.comments
      .sort((a, b) =>  new Date(a.createDate) - new Date(b.createDate))
      .map((comment) => (
           <Comment problem={problem} comment={comment}/>
          ))
      )}
    </div>
  );
};

export default Comments;
