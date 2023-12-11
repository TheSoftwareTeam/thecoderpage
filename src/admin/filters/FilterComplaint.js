import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-complaint.scss";

function FilterProblem() {
  const { state, getComplaintProblem } = useContext(AdminContext);
  const [status, setStatus] = useState("0");
  const [dates, setDates] = useState("0");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentFilter = {
      status: status,
      date: calculateDate(dates),
      search: search
    };
    getComplaintProblem(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dates, search]);

  function calculateDate(value) {
    const now = new Date();
    switch (value) {
      case "1": // Son 24 Saat
        now.setHours(now.getHours() - 24);
        break;
      case "2": // Son 7 Gün
        now.setDate(now.getDate() - 7);
        break;
      case "3": // Son 30 Gün
        now.setDate(now.getDate() - 30);
        break;
      case "4": // Son 90 Gün
        now.setDate(now.getDate() - 90);
        break;
      case "5": // Son 1 Yıl
        now.setFullYear(now.getFullYear() - 1);
        break;
      default: // Tüm Zamanlar
        return null;
    }
    return now.toISOString();
  }

  return (
    <form className="filter-complaint">

      <select onChange={(e) => setDates(e.target.value)}>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tüm Durumlar</option>
        <option value="submitted">Alındı</option>
        <option value="inProgress">İşleniyor</option>
        <option value="resolved">Çözüldü</option>
      </select>

      <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Arama Kelimesi"
        />
     
    </form>
  );
}

export default FilterProblem;
