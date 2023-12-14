/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/comments.scss";
import AdminContext from "../../context/AdminContext";
import Comment from "./Comment";
import FilterProblem from "../filters/FilterProblem";
const Comments = () => {
  const { state, getProblem } = useContext(AdminContext);

  useEffect(() => {
    getProblem(false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="admin-comment-container">
      <div id="comment-list">
      <FilterProblem />
        {state.problems.map((problem) => {
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
          onClick={async () => getProblem(true)}
          className="list-load-more"
        >
          Daha Fazla
        </button>
      )}
    </div>
  );
};

export default Comments;
