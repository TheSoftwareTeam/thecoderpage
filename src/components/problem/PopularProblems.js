import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./popular-problems.scss";
import { useNavigate } from "react-router-dom";
const PopularProblems = () => {
  const { state } = useContext(UserContext);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const navigate = useNavigate();
  const sortedProblems = [...state.problems]
    .sort((a, b) => b.likesUserId.length - a.likesUserId.length)
    .slice(0, 5);
  const currentProblem = sortedProblems[currentProblemIndex];
  const nextProblem = () => {
    setCurrentProblemIndex(
      (prevIndex) => (prevIndex + 1) % sortedProblems.length
    );
  };

  const prevProblem = () => {
    setCurrentProblemIndex(
      (prevIndex) =>
        (prevIndex - 1 + sortedProblems.length) % sortedProblems.length
    );
  };

  return (
    <div className="popular">
      {console.log(currentProblem)}

      {currentProblem && (
        <div className="popular-content">
          <h1>
            Populer
            <hr />
          </h1>
          <div
            onClick={() => navigate(`/home/detailproblem/${currentProblem.id}`)}
          >
            <h2>{currentProblem.problemHead}</h2>
            <p>{currentProblem.problemContent}</p>
           
          </div>
          <span>{"🤍" + currentProblem.likesUserId.length}</span>
            <span>✉️{currentProblem.comments.length}</span>
          <button className="prevButton">
            <FaChevronLeft onClick={prevProblem} />
          </button>
          <button className="nextButton">
            <FaChevronRight onClick={nextProblem} />
          </button>
          <div className="pagination">
            {sortedProblems.map((problem, index) => (
              <span
                key={index}
                className={`circle ${
                  index === currentProblemIndex ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProblems;
