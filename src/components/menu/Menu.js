import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./menu.scss";
import { Outlet } from "react-router-dom";
import { FaHtml5, FaCss3Alt, FaReact, FaJava } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { SiCsharp } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
const Menu = () => {
  const { state, dispatch } = useContext(UserContext);
  
  return (
    <>
      {" "}
      <nav>
        <hr />
        <ul>
          <li
            className={state.selectedCategory === null ? "navi-active" : ""}
            onClick={() => {
              dispatch({ type: "selectedCategory", payload: null });
            }}
          >
            <BiCategoryAlt style={{ color: "sienna" }} />
            <span>Hepsi</span>
          </li>
          {state.categories.map((category) => (
            <li
              className={
                state.selectedCategory === category.id ? "navi-active" : ""
              }
              onClick={() => {
                dispatch({ type: "selectedCategory", payload: category.id });
              }}
              key={category.id}
            >
              {category.categoryName === "HTML" && (
                <>
                  <FaHtml5 style={{ color: "red" }} />
                  <span>HTML</span>
                </>
              )}
              {category.categoryName === "CSS" && (
                <>
                  <FaCss3Alt style={{ color: "blue" }} />
                  <span>CSS</span>
                </>
              )}
              {category.categoryName === "JAVASCRIPT" && (
                <>
                  <RiJavascriptFill style={{ color: "rgb(224, 196, 36)" }} />{" "}
                  <span> JavaScript</span>
                </>
              )}
              {category.categoryName === "REACT" && (
                <>
                  <FaReact style={{ color: "cadetblue" }} />
                  <span> React</span>
                </>
              )}
              {category.categoryName === "JAVA" && (
                <>
                  <FaJava style={{ color: "orange" }} />
                  <span> Java</span>
                </>
              )}
              {category.categoryName === "PHYTON" && (
                <>
                  <span>P Phyton</span>
                </>
              )}
              {category.categoryName === "CSHARP" && (
                <>
                  <SiCsharp style={{ color: "purple" }} />
                  <span>C#</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
      
    </>
  );
};

export default Menu;
