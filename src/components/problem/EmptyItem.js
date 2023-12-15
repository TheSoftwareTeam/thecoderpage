import React from 'react'
import image from "../../images/avatar.png";

const EmptyItem = () => {
  return (
    <div className="user-problem">
            <div className="user-user-picture">
              <img src={image} alt="res" />
              <h3>Bu kategoride problem paylaşılmaıştır </h3>
            </div>
          </div>
  )
}

export default EmptyItem