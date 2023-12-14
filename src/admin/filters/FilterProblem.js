import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-problem.scss";


function FilterProblem() {
  const { state, dispatch, getProblem } = useContext(AdminContext);

  useEffect(() => {
    getProblem(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.fltProblemCategory,
    state.fltProblemDate,
    state.fltProblemIscompleted,
    state.fltProblemSearch,
    state.fltProblemIsdeleted,
    state.fltProblemUserName,
  ]);

  return (
    <form className="filterProblem">
      <select
        value={state.fltProblemDate}
        onChange={(e) =>
          dispatch({ type: "fltProblemDate", payload: e.target.value })
        }
      >
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>
      <select
        value={state.fltProblemIsdeleted}
        onChange={(e) =>
          dispatch({ type: "fltProblemIsdeleted", payload: e.target.value })
        }
      >
        <option value="false">Silinmemiş</option>
        <option value="true">Silinmiş</option>
        <option value="0">Tümü</option>
      </select>
      <select
        value={state.fltProblemIscompleted}
        onChange={(e) =>
          dispatch({ type: "fltProblemIscompleted", payload: e.target.value })
        }
      >
        <option value="0">Tüm Durumlar</option>
        <option value="true">Çözülmüş</option>
        <option value="false">Çözülmemiş</option>
      </select>
      <input
        onChange={(e) =>
          dispatch({ type: "fltProblemSearch", payload: e.target.value })
        }
        value={state.fltProblemSearch}
        type="search"
        placeholder="Genel arama"
      />{" "}
      <input
        onChange={(e) =>
          dispatch({ type: "fltProblemUserName", payload: e.target.value })
        }
        type="search"
        value={state.fltProblemUserName}
        placeholder="Kullanıcı adı ile arama"
      />
      <div>
        {state.categories.map((category) => (
          category.isDeleted === false&& <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={state.fltProblemCategory.find(
                (id) => Number(id) === category.id
              )}
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch({
                    type: "fltProblemCategory",
                    payload: [...state.fltProblemCategory, e.target.value],
                  });
                } else {
                  dispatch({
                    type: "fltProblemCategory",
                    payload: state.fltProblemCategory.filter(
                      (cat) => cat !== e.target.value
                    ),
                  });
                }
              }}
            />
            {category.categoryName}
          </label>
        ))}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "fltProblemIsdeleted", payload: "false" });
          dispatch({ type: "fltProblemIscompleted", payload: "0" });
          dispatch({ type: "fltProblemUserName", payload: "" });
          dispatch({ type: "fltProblemSearch", payload: "" });
          dispatch({ type: "fltProblemCategory", payload: [] });
          dispatch({ type: "fltProblemDate", payload: "0" });
        }}
      >
        Temizle
      </button>
    </form>
  );
}

export default FilterProblem;
