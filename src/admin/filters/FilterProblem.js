import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import "./scss/filter-problem.scss";

function FilterProblem() {
  const { state, getFilterProblem } = useContext(AdminContext);
  const [iscomplated, setIscomplated] = useState("0");
  const [isdeleted, setIsDeleted] = useState("0");
  const [category, setCategory] = useState([]);
  const [dates, setDates] = useState("0");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentFilter = {
      cozuldu: iscomplated,
      category:category,
      isdeleted:isdeleted,
      date: calculateDate(dates),
      search: search
    };
    getFilterProblem(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iscomplated, category,isdeleted, dates, search]);

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
    <form className="FilterProblem">

      <select onChange={(e) => setDates(e.target.value)}>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>

      <select onChange={(e) => setIsDeleted(e.target.value)}>
        <option value="false">Silinmemiş</option>
        <option value="true">Silinmiş</option>
        <option value="0">Tümü</option>
      </select>

      <select onChange={(e) => setIscomplated(e.target.value)}>
        <option value="0">Tüm Durumlar</option>
        <option value="true">Çözülmüş</option>
        <option value="false">Çözülmemiş</option>
      </select>

      <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Arama Kelimesi"
        />
      <div>
        {state.categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory((prevState) => [...prevState, e.target.value]);
                } else {
                  setCategory((prevState) =>
                    prevState.filter((cat) => cat !== e.target.value)
                  );
                }
              }}
              />
            {category.categoryName}
          </label>
        ))}

       
      </div>
    </form>
  );
}

export default FilterProblem;
