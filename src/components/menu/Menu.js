import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import './menu.scss'
import { Outlet } from 'react-router-dom';
const Menu = () => {
    const { state, dispatch} =
    useContext(UserContext);
  return (
    <> <nav>
    <ul>
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
          {category.categoryName === "CSHARP"
            ? "C#"
            : category.categoryName}
        </li>
      ))}
    </ul>
  </nav>
  <Outlet />
    </>
   
  )
}

export default Menu