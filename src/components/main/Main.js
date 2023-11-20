import React from "react";

import "./main.scss";

import Menu from "../menu/Menu";
import PopularProblems from "../problem/PopularProblems";
import Banner from "../banner/Banner";
import ListProblem from "../problem/ListProblem";

const Main = () => {
  return (
    <div id="main">
      <Banner />
      <Menu />
   
        <PopularProblems />
    
      
      <div className="main-line">
        <ListProblem />
      </div>
      <button className="moreProblems">Daha Fazlası ..</button>
    </div>
  );
};

export default Main;
