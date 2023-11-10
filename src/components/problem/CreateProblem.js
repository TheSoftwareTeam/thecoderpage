import React, { useContext } from "react";
import "./create-problem.scss";
import UserContext from "../../context/UserContext";

const CreateProblem = () => {
  const { state, dispatch, createProblem } = useContext(UserContext);

  return (
    <div className="create-content">
      <h2>Problem oluştur</h2>
      <div className="aciklama">
        <div className="text">
          Açıklama Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy
        </div>
      </div>
      <form onSubmit={createProblem}>
        <select
          onChange={(e) =>dispatch({ type: "categoryId", payload: Number(e.target.value) })}
          required
        >
          <option value="">Selected Category</option>
          {state.categories.map((category) => (
            <option value={category.id} key={category} >
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
          required
        />
        <textarea
          onChange={(e) =>
            dispatch({ type: "problemContent", payload: e.target.value })
          }
          type="text"
          value={state.problemContent}
          placeholder="İçerik"
          required
        />
        <input type="submit" value="Kaydet" />
      </form>
    </div>
  );
};

export default CreateProblem;
