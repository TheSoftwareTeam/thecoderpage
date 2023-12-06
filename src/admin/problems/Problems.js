
import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/problems.scss";
import Problem from "./Problem";
const Problems = () => {
  const { state,getProblem } = useContext(AdminContext);

  return (
    <div id="container">

      <div id="problem-list">

      {state.problems.sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
          }).map(
        (problem) =>
          !problem.isDeleted && (
           <Problem problem={problem}/>
          )
      )}
      </div>
      {
          state.loadMoreButton&& (
            <button
              onClick={ async() =>  getProblem(4,true)}
              className="list-load-more"
            >
              Daha Fazla
            </button>
          )
          }
    </div>
  );
};

export default Problems;
