/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/comments.scss";
import AdminContext from "../../context/AdminContext";
import Comment from "./Comment";
import FilterComment from "../filters/FilterComment";
const Comments = () => {
  const { state, getComments } = useContext(AdminContext);

  useEffect(() => {
    getComments(false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="admin-comment-container">
      <div id="comment-list">
      <FilterComment />
        {state.problemComments.map((problem) => {
          return (
            problem.isDeleted === false &&
            problem.comments.map(
              (comment) =>
                !comment.isDeleted && (
                  <Comment problem={problem} comment={comment} />
                )
            )
          );
        })}
      </div>
      {state.loadMoreButton && (
        <button
          onClick={async () => getComments(true)}
          className="list-load-more"
        >
          Daha Fazla
        </button>
      )}
    </div>
  );
};

export default Comments;
