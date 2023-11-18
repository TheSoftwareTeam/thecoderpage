/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import "./categories.scss";
const Categories = () => {
  const { state, dispatch, createCategory } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div id="admin-categories-container">
      <form onSubmit={createCategory}>
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: "categoryName", payload: e.target.value })
          }
          placeholder="Kategori İsmi"
          value={state.categoryName}
          required
        />
        <button type="submit">Kategori Ekle</button>
      </form>

      <div id="category-list">
        {state.categories.map((category) => (
          <div
            className="admin-categories"
            onClick={() => navigate(`/admin/categorydetail/${category.id}`)}
            key={category.id}
          >
            <h1>{category.categoryName}</h1>
            <h4>Problem Sayısı - {category.problemCount}</h4>
            <hr/> 
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
