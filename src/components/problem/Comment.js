import React from 'react'
import "./scss/comment.scss";
import UserPicture from "./UserPicture";
const Comment = ({comment}) => {
    
  return (
    <div key={comment.id} className="user-comment">
    <UserPicture userId={comment.userId} createDate={comment.createDate}  isDisabled={true} />
    
    {comment.commentContent.length>200?<p>{comment.commentContent.slice(0,200)}...</p>:<p>{comment.commentContent}</p>}
    
  </div>
  )
}

export default Comment