import React, { useContext, useEffect } from 'react'
import AdminContext from '../../context/AdminContext';
import { useParams } from 'react-router-dom';
import './categories.scss'
const CategoryDetail = () => {
  
  const { state, dispatch, getCategoryDetail,  deleteCategory } = useContext(AdminContext);

  const { id } = useParams();

  useEffect(() => {
    getCategoryDetail(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

 
  return (
    <div id="admin-categories-container">
      <form onSubmit={""}>
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: "categoryName", payload: e.target.value })
          }
          placeholder="Kategori İsmi"
          value={state.categoryName&&state.categoryName}
          required
        />
        <button type="submit">Kategori Güncelle</button>
      </form>
  
      <div id="category-list">
        <div>
          <h1>{state.categoryDetail&&state.categoryDetail.categoryName}</h1>
          <h4>Problem Sayısı - {state.categoryDetail&&state.categoryDetail.problemCount}</h4>
          <hr/> 
          <br/>
          <div className="action">
            <button onClick={() => deleteCategory(id)}>Sil</button>
     
          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoryDetail