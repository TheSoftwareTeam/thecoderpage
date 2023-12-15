import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import "./scss/like-commend.scss"
const LikeCommend = ({problem,isDisabled}) => {
  const { state,handleCompletedProblem,actionLike } = useContext(UserContext);
    
  return (
    <div className="problem-comment-view">
    <button onClick={() => {!isDisabled&&actionLike(problem.id)}}>
      {state.activeUser !== null
        ? problem.likesUserId.find((id) => id === state.activeUser.id)
          ? "❤️"
          : "🤍"
        : "🤍"}
      {problem.likesUserId.length}
    </button>
    <button>✉️{problem.comments.length}</button>

    {
    state.activeUser&& !isDisabled&&
    state.activeUser.id === problem.userId ? (
      <span
        className="completed-button "
        onClick={() => handleCompletedProblem(problem.id)}
      >
        {" "}
        {problem.isCompleted === false
          ? "✅ Çözüldü olarak işaretle"
          : "❌ Çözülmedi olarak işaretle"}
      </span>
    ) : (
      ""
    )}
  </div>
  )
}

export default LikeCommend