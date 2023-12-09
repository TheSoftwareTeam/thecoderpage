/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";

import "./scss/user-problems.scss";
import {  useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import Problem from "./Problem";
import FilterProblem from "../filters/FilterProblem";

const UserProblem = () => {
  const { userName } = useParams();

  const { state, activeUserProblem } =
    useContext(UserContext);


  useEffect(() => {
    activeUserProblem(userName.toLowerCase());

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
          <div className="user-problem">
            <div className="user-user-picture">
              <img src={image} alt="res" />
              <h3>Henüz problem paylaşmadınız</h3>
            </div>
          </div>
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
      </div>
    
    </div>
  );
};

export default UserProblem;
