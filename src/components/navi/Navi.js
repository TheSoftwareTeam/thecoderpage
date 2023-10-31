import React from "react";
import { Outlet } from "react-router-dom";
import "./nav.scss";

const Navi = () => {
  return (
    <>
      <div className="navi-container">
        <div className="header">
          <h3>TheCoderPage</h3>
          <button>Giriş Yap</button>
        </div>
        <nav>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>C#</li>
            <li>React</li>
            <li>Java</li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navi;
