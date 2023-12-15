import React from 'react'
import image from "../../images/avatar.png";
import "./scss/empty-item.scss";
const EmptyItem = () => {
  return (
    <div className="user-problem">
            <div className="user-user-picture">
              <img src={image} alt="res" />
              <h3>Bu filtreye uygun problem bulunamadı. </h3>
            </div>
          </div>
  )
}

export default EmptyItem