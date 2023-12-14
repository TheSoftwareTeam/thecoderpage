import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/problems.scss";
import Problem from "./Problem";
import image from "../../images/avatar.png";
import FilterProblem from "../filters/FilterProblem";
const Problems = () => {
  const { state, getProblem } = useContext(AdminContext);

  useEffect(() => {
   
    getProblem(false);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="container">
      <div id="problem-list">
        <FilterProblem />
        {
        state.problems.length === 0 
         ? (
          <div className="admin-problem">
            <div className="list-admin-picture">
              <img src={image} alt="res" />
              <h3>Bu kategoride henüz problem paylaşılmamış.</h3>
            </div>
          </div>
        ) :  
        state.problems
          .sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
          })
          .map(
            (problem) => <Problem problem={problem} />
          )}
      </div>
      {state.loadMoreButton && (
        <button
          onClick={async () => getProblem(true)}
          className="list-load-more"
        >
          Daha Fazla
        </button>
      )}
      <p className='pages-items-count'>
 Sonuç sayısı :  {state.problems.length}
  </p>
    </div>
  );
};

export default Problems;
