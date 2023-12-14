import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-complaint.scss";

function FilterProblem() {
  const { state, getComplaints,dispatch } = useContext(AdminContext);

  useEffect(() => {
    getComplaints(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.fltrComplaintDate,
    state.fltrComplaintSearch,
    state.fltrComplaintStatus,
    state.fltrComplaintUserName,
  ]);

  return (
    <form className="filter-complaint">
      <select value={state.fltrComplaintDate}
        onChange={(e) =>
          dispatch({ type: "fltrComplaintDate", payload: e.target.value })
        }>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select value={state.fltrComplaintStatus}
        onChange={(e) =>
          dispatch({ type: "fltrComplaintStatus", payload: e.target.value })
        }>
        <option value="">Tüm Durumlar</option>
        <option value="submitted">Alındı</option>
        <option value="inProgress">İşleniyor</option>
        <option value="resolved">Çözüldü</option>
      </select>

      <input
       value={state.fltrComplaintSearch}
       onChange={(e) =>
         dispatch({ type: "fltrComplaintSearch", payload: e.target.value })
       }
        type="search"
        placeholder="Arama Kelimesi"
      />
       <input
       value={state.fltrComplaintUserName}
       onChange={(e) =>
         dispatch({ type: "fltrComplaintUserName", payload: e.target.value })
       }
        type="search"
        placeholder="Kullanıcı adı Arama"
      />
         <button
      onClick={
        (e) => {
          e.preventDefault();
          dispatch({ type: "fltrComplaintUserName", payload: "" });
          dispatch({ type: "fltrComplaintStatus", payload: "" });
          dispatch({ type: "fltrComplaintSearch", payload: "" });
          dispatch({ type: "fltrComplaintDate", payload: "0" });

        }
      }>
Temizle
      </button>
    </form>
  );
}

export default FilterProblem;
