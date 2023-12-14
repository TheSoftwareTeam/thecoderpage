import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-problem.scss";
import { useParams } from "react-router-dom";

function FilterProblem() {
  const { state, dispatch, getProblem } = useContext(AdminContext);

  useEffect(() => {
    getProblem(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.filterCategory,
    state.filterDate,
    state.filterIscompleted,
    state.filterSearch,
    state.filterIsdeleted,
    state.filterUserName,
  ]);

  return (
    <form className="FilterProblem">
      <select
        value={state.filterDate}
        onChange={(e) =>
          dispatch({ type: "filterDate", payload: e.target.value })
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
        value={state.filterIsdeleted}
        onChange={(e) =>
          dispatch({ type: "filterIsdeleted", payload: e.target.value })
        }
      >
        <option value="false">Silinmemiş</option>
        <option value="true">Silinmiş</option>
        <option value="0">Tümü</option>
      </select>
      <select
        value={state.filterIscompleted}
        onChange={(e) =>
          dispatch({ type: "filterIscompleted", payload: e.target.value })
        }
      >
        <option value="0">Tüm Durumlar</option>
        <option value="true">Çözülmüş</option>
        <option value="false">Çözülmemiş</option>
      </select>
      <input
        onChange={(e) =>
          dispatch({ type: "filterSearch", payload: e.target.value })
        }
        value={state.filterSearch}
        type="search"
        placeholder="Genel arama"
      />{" "}
      <input
        onChange={(e) =>
          dispatch({ type: "filterUserName", payload: e.target.value })
        }
        type="search"
        value={state.filterUserName}
        placeholder="Kullanıcı adı ile arama"
      />
      <div>
        {state.categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={state.filterCategory.find(
                (id) => Number(id) === category.id
              )}
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch({
                    type: "filterCategory",
                    payload: [...state.filterCategory, e.target.value],
                  });
                } else {
                  dispatch({
                    type: "filterCategory",
                    payload: state.filterCategory.filter(
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
          dispatch({ type: "filterIsdeleted", payload: "false" });
          dispatch({ type: "filterIscompleted", payload: "0" });
          dispatch({ type: "filterUserName", payload: "" });
          dispatch({ type: "filterSearch", payload: "" });
          dispatch({ type: "filterCategory", payload: [] });
          dispatch({ type: "filterDate", payload: "0" });
        }}
      >
        Temizle
      </button>
    </form>
  );
}

export default FilterProblem;
