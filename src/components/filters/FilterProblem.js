import React, { useContext, useEffect, useState } from "react";
import "./scss/filter-problem.scss";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";
import e from "cors";

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
}, [state.filterCategory,state.filterDate,state.filterIscompleted,state.filterSearch]);

 

  return (
    <form className="filter-problem">
  {state.selectedCategory == null && <button
          onMouseEnter={(e) => {
            setIsOpen(true);
       
          }}
        onclick={()=>e.preventDefault()}
          onMouseLeave={(e) => {
            setIsOpen(false);
          }}
        >
         Kategorileri Göster
          <div className={`${isOpen ? "menu" : "hidden-menu"}`}>
        {state.selectedCategory === null &&
          state.categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                value={category.id}
                checked={state.filterCategory.find((id)=>Number(id)===category.id)}
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
        </button>} 
     

      <select value={state.filterDate} onChange={(e) => dispatch({type:"filterDate",payload:e.target.value})}>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select value={state.filterIscompleted} onChange={(e) => dispatch({type:"filterIscompleted",payload:e.target.value})}>
        <option value="0">Tüm Durumlar</option>
        <option value="true">Çözülmüş</option>
        <option value="false">Çözülmemiş</option>
      </select>

      {userName && <input type="search" placeholder="Aranacak kelimeyi yazın.." value={state.filterSearch} onChange={(e) => dispatch({type:"filterSearch",payload:e.target.value})} />}

      
      <button className="clear-filter" onClick={(e) => {
        console.log(state.filterCategory);
         e.preventDefault();
        dispatch({type:"filterCategory",payload:[]});
        dispatch({type:"filterDate",payload:"0"});
        dispatch({type:"filterIscompleted",payload:"0"});
        dispatch({type:"filterSearch",payload:""});
        setIsOpen(false);
      }
      }>Filtreyi Temizle</button>
    </form>
  );
}

export default FilterProblem;
