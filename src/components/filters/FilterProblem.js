import React, { useContext, useEffect, useState } from "react";
import "./scss/filter-problem.scss";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";
function FilterProblem() {
  const { state, dispatch,getProblem,activeUserProblem } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const {userName}=useParams();
useEffect(() => {
  
  if(userName)
  {
    activeUserProblem(false,userName);
  }
  else getProblem(false);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [state.filterCategory,state.filterDate,state.filterIscompleted]);

  function calculateDate(value) {
    const now = new Date();
    switch (value) {
      case "1": // Son 24 Saat
        now.setHours(now.getHours() - 24);
        break;
      case "2": // Son 7 Gün
        now.setDate(now.getDate() - 7);
        break;
      case "3": // Son 30 Gün
        now.setDate(now.getDate() - 30);
        break;
      case "4": // Son 90 Gün
        now.setDate(now.getDate() - 90);
        break;
      case "5": // Son 1 Yıl
        now.setFullYear(now.getFullYear() - 1);
        break;
      default: // Tüm Zamanlar
        return null;
    }
    return now.toISOString();
  }

  return (
    <form className="filter-problem">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        Kategorileri Göster
      </button>

      <div className={`${isOpen ? "menu" : "hidden-menu"}`}>
        {state.selectedCategory === null &&
          state.categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                value={category.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch({ type: "filterCategory", payload: [...state.filterCategory, e.target.value] });
                  } else {
                    dispatch({ type: "filterCategory", payload: state.filterCategory.filter((cat) => cat !== e.target.value) });
                  }
                }}
              />
              {category.categoryName}
            </label>
          ))}{" "}
      </div>

      <select onChange={(e) => dispatch({type:"filterDate",payload:calculateDate(e.target.value)})}>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select onChange={(e) => dispatch({type:"filterIscompleted",payload:e.target.value})}>
        <option value="0">Tüm Durumlar</option>
        <option value="true">Çözülmüş</option>
        <option value="false">Çözülmemiş</option>
      </select>
    </form>
  );
}

export default FilterProblem;
