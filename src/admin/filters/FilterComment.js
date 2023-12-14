import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-comment.scss";

function FilterComment() {
  const { state, dispatch, getComments } = useContext(AdminContext);

  useEffect(() => {
    getComments(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fltrCommentDate, state.fltrCommentSearch, state.fltrCommentIsdeleted]);

  return (
    <form className="filterComment">
      <select
        value={state.fltrCommentDate}
        onChange={(e) =>
          dispatch({ type: "fltrCommentDate", payload: e.target.value })
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
        value={state.fltrCommentIsdeleted}
        onChange={(e) =>
          dispatch({ type: "fltrCommentIsdeleted", payload: e.target.value })
        }
      >
        <option value="false">Silinmemiş</option>
        <option value="true">Silinmiş</option>
        <option value="0">Tümü</option>
      </select>
      <input
        onChange={(e) =>
          dispatch({ type: "fltrCommentSearch", payload: e.target.value })
        }
        value={state.fltrCommentSearch}
        type="search"
        placeholder="Genel arama"
      />{" "}
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "fltrCommentIsdeleted", payload: "false" });

          dispatch({ type: "fltrCommentSearch", payload: "" });

          dispatch({ type: "fltrCommentDate", payload: "0" });
        }}
      >
        Temizle
      </button>
    </form>
  );
}

export default FilterComment;
