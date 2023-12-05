import React, { useContext } from "react";
import "./scss/create-problem.scss";
import UserContext from "../../context/UserContext";

const CreateProblem = () => {
  const { state, dispatch, createProblem } = useContext(UserContext);

  return (
    <div className="create-content">
      <h2>Problem oluştur</h2>
      <div className="state">
        <div className="text">
        Kod yazarken karşılaştığınız sorunları paylaşın, çözümleri birlikte
            bulalım.
        </div>
      </div>
      <form onSubmit={createProblem}>
        <select
          onChange={(e) =>
            dispatch({ type: "categoryId", payload: Number(e.target.value) })
          }
          required
        >
          <option value="">Selected Category</option>
          {state.categories.map((category) => (
            <option value={category.id} key={category}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <input
          onChange={(e) =>
            dispatch({ type: "problemHead", payload: e.target.value })
          }
          type="text"
          value={state.problemHead}
          placeholder="Başlık"
          maxLength={50}
          required
        />
        <textarea
          onChange={(e) =>
            dispatch({ type: "problemContent", payload: e.target.value })
          }
          type="text"
          value={state.problemContent}
          placeholder="İçerik"
          maxLength={1500}
    
          required
        />
        <p>{1500-state.problemContent.length}</p>
        <input type="submit" value="Kaydet" />
      </form>
      
    </div>
  );
};

export default CreateProblem;
