import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import DataContext from '../../context/DataContext'
import "./nav.scss";

const Navi = () => {
  const {state}=useContext(DataContext)
  return (
    <>
      <div className="navi-container">
        <div className="header">
          <h3><NavLink className="link" to="/home/main">TheCoderPage</NavLink></h3>
          <button><NavLink className="link" to="login">Giriş Yap</NavLink></button>
        </div>
        <nav>
          <ul>
            {state.categories.map((category)=>
            <li key={category.id}>{category.categoryName}</li>
            )}
            
          </ul>
        </nav>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
      
    </>
  );
};

export default Navi;
