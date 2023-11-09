/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./categories.scss";
const Categories = () => {
  const { state,dispatch, createCategory } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div id="admin-categories-container">
      <form onSubmit={createCategory}>
        <input type="text" onChange={(e)=>dispatch({type:"categoryName",payload:e.target.value})} placeholder="Kategori İsmi" value={state.categoryName} required/>
        <button type="submit" >Kategori Ekle</button>
      </form>
      <hr/>
      {state.categories.map((category) => (
        <div
          onClick={() => navigate(`/admin/categorydetail/${category.id}`)}
          key={category.id}
          className="admin-categories"
        >
            <h1>{category.categoryName}</h1>
        </div>
      ))}


    </div>
  );
};

export default Categories;
