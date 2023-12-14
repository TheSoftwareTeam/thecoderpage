import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import image from "../../images/avatar.png";
import "./scss/comment.scss";
const Comment = ({comment}) => {
    const {
        state,
        formatRelativeTime,
      } = useContext(UserContext);
      const navigate = useNavigate();
  return (
    
    <div key={comment.id} className="user-comment">
    <div className="comment-user-picture">
      {state.users.find((user) => user.id === comment.userId)
        ?.userPicture ? (
        <img
          src={
            "http://localhost:3001/" +
            state.users.find((user) => user.id === comment.userId)
              ?.userPicture
          }
          alt="res"
        />
      ) : (
        <img src={image} alt="res" />
      )}
      <h4
        onClick={() =>
          navigate(
            `/home/profile/${
              state.users.find((user) => user.id === comment.userId)
                ?.userName
            }/detail`
          )
        }
      >
        {
          state.users.find((user) => user.id === comment.userId)
            ?.userName
        }
      </h4>
      <span>{formatRelativeTime(comment.createDate)}</span>
    </div>

    {comment.commentContent.length>200?<p>{comment.commentContent.slice(0,200)}...</p>:<p>{comment.commentContent}</p>}
    
  </div>
  )
}

export default Comment