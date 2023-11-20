import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import "./popular-problems.scss";
const PopularProblems = () => {
  const { state } = useContext(UserContext);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  // Sort problems by likes
  const sortedProblems = [...state.problems].sort((a, b) => b.likesUserId.length - a.likesUserId.length);

  // Get the current problem
  const currentProblem = sortedProblems[currentProblemIndex];

  // Function to go to the next problem
  const nextProblem = () => {
    setCurrentProblemIndex((prevIndex) => (prevIndex + 1) % sortedProblems.length);
  };

  return (
    <div className="popular">
      <h1>Populer</h1>
      {currentProblem && (
        <div className="popular-content">
          <h2>{currentProblem.problemHead}</h2>
          <p>{currentProblem.problemContent}</p>
          <button onClick={nextProblem}>Next Problem</button>
        </div>
      )}
    </div>
  );
};

export default PopularProblems;