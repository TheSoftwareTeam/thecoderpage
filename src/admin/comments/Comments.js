/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import "./scss/comments.scss";
import AdminContext from "../../context/AdminContext";
import Comment from "./Comment";
const Comments = () => {
  const { state, dispatch, getProblem } = useContext(AdminContext);

  useEffect(() => {
    dispatch({ type: "loadMorePages", payload: 1 }); // Sayfa numarasını sıfırlar
    getProblem(false);
    dispatch({ type: "hideLoadMoreButton", payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="admin-comment-container">
      <div id="comment-list">
        {state.problems.map((problem) => {
          console.log(problem);
          return (
            problem.isDeleted === false &&
            problem.comments.map((comment) => (
              <Comment problem={problem} comment={comment} />
            ))
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
