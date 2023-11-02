import React, { useContext, useState } from "react";
import "./create-problem.scss";
import DataContext from "../../context/DataContext";

const CreateProblem = () => {
  const { state, dispatch } = useContext(DataContext);
  const [inputdata, setInputData] = useState({
    id: state.problems.length,
    userId: 0,
    categoryId: 0,
    problemHead: "",
    problemContent: "",
    commentCount: 0,
    likeCount: 0,
    createDate: "23.11.2023",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "createProblem", payload: inputdata });
    console.log(inputdata);
  };
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
      <form onSubmit={handleSubmit}>
        <select
          onChange={(e) =>
            setInputData({ ...inputdata, categoryId:Number (e.target.value) })
          }
          required
        >
          <option value="">Selected Category</option>
          {state.categories.map((category) => (
            <option key={category} value={category.id}>
              {category.categoryName}
            </option>
          ))}{" "}
        </select>
        <input
          onChange={(e) =>
            setInputData({ ...inputdata, problemHead: e.target.value })
          }
          type="text"
          placeholder="Başlık"
          required
        />
        <textarea
          onChange={(e) =>
            setInputData({ ...inputdata, problemContent: e.target.value })
          }
          type="text"
          placeholder="İçerik"
          required
        />
        <input type="submit" value="Kaydet" />
      </form>
    </div>
  );
};

export default CreateProblem;
