/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";

import "./scss/user-problems.scss";
import {  useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Problem from "./Problem";
import FilterProblem from "../filters/FilterProblem";
import EmptyItem from "./EmptyItem";

const UserProblem = () => {
  const { userName } = useParams();

  const { state, activeUserProblem,dispatch } =
    useContext(UserContext);


  useEffect(() => {
    dispatch({ type: "filterCategory", payload: [] });
    dispatch({ type: "filterDate", payload: null });
    dispatch({ type: "filterIscompleted", payload: null });
    dispatch({ type: "filterSearch", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <div id="user-container">
      <div id="user-content">
        <FilterProblem />
        {state.activeUserProblem.length === 0 ||
        !state.activeUserProblem.some(
          (problem) =>
            !problem.isDeleted &&
            (problem.categoryId === state.selectedCategory ||
              state.selectedCategory === null)
        ) ? (
          <EmptyItem />
        ) : (
          state.activeUserProblem.sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
          }).map(
            (problem) =>
              !problem.isDeleted &&
              (
                <Problem key={problem.id} problem={problem} />
              ) 
          )
        )}
        {
          state.loadMoreButton&& (
            <button
              onClick={ async() =>activeUserProblem(true,userName.toLowerCase())}
              className="list-load-more"
            >
              Daha Fazla
            </button>
          )
          }
      </div>
     
    </div>
  );
};

export default UserProblem;
