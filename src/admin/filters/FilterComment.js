import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-comment.scss";

function FilterComment() {
  const { state, dispatch, getProblem } = useContext(AdminContext);

  useEffect(() => {
    getProblem(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filterDate, state.filterSearch, state.filterIsdeleted]);

  return (
    <form className="filterComment">
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
      <input
        onChange={(e) =>
          dispatch({ type: "filterSearch", payload: e.target.value })
        }
        value={state.filterSearch}
        type="search"
        placeholder="Genel arama"
      />{" "}
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "filterIsdeleted", payload: "false" });

          dispatch({ type: "filterSearch", payload: "" });

          dispatch({ type: "filterDate", payload: "0" });
        }}
      >
        Temizle
      </button>
    </form>
  );
}

export default FilterComment;
