import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-complaint.scss";

function FilterProblem() {
  const { state, getComplaints,dispatch } = useContext(AdminContext);

  useEffect(() => {
    getComplaints(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.filterDate,
    state.filterSearch,
    state.filterStatus,
    state.filterUserName,
  ]);

  return (
    <form className="filter-complaint">
      <select value={state.filterDate}
        onChange={(e) =>
          dispatch({ type: "filterDate", payload: e.target.value })
        }>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select value={state.filterStatus}
        onChange={(e) =>
          dispatch({ type: "filterStatus", payload: e.target.value })
        }>
        <option value="">Tüm Durumlar</option>
        <option value="submitted">Alındı</option>
        <option value="inProgress">İşleniyor</option>
        <option value="resolved">Çözüldü</option>
      </select>

      <input
       value={state.filterSearch}
       onChange={(e) =>
         dispatch({ type: "filterSearch", payload: e.target.value })
       }
        type="search"
        placeholder="Arama Kelimesi"
      />
       <input
       value={state.filterUserName}
       onChange={(e) =>
         dispatch({ type: "filterUserName", payload: e.target.value })
       }
        type="search"
        placeholder="Kullanıcı adı Arama"
      />
         <button
      onClick={
        (e) => {
          e.preventDefault();
          dispatch({ type: "filterUserName", payload: "" });
          dispatch({ type: "filterStatus", payload: "" });
          dispatch({ type: "filterSearch", payload: "" });
          dispatch({ type: "filterDate", payload: "0" });

        }
      }>
Temizle
      </button>
    </form>
  );
}

export default FilterProblem;
