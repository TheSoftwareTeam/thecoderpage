import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./scss/filter-problem.scss";
function FilterProblem() {
  const { state } = useContext(UserContext);
  return (
    <form className="FilterProblem">
      <select>
        <option value="0">Tüm Konular</option>
        <option value="1">Algoritma</option>
        <option value="2">Veri Yapıları</option>
        <option value="3">Programlama Dilleri</option>
        <option value="4">Veritabanı</option>
        <option value="5">Ağ</option>
        <option value="6">Web</option>
        <option value="7">Mobil</option>
        <option value="8">Gömülü Sistemler</option>
        <option value="9">Robotik</option>
        <option value="10">Yapay Zeka</option>
        <option value="11">Oyun Geliştirme</option>
        <option value="12">Diğer</option>
      </select>
      <select>
        <option value="0">Tüm Zamanlar</option>
        <option value="1">Son 24 Saat</option>
        <option value="2">Son 7 Gün</option>
        <option value="3">Son 30 Gün</option>
        <option value="4">Son 90 Gün</option>
        <option value="5">Son 1 Yıl</option>
      </select>
      <select>
        <option value="0">Tüm Durumlar</option>
        <option value="1">Çözülmüş</option>
        <option value="2">Çözülmemiş</option>
      </select>
      <div>
       
        {state.categories.map((category) => (
          <label key={category.id}>
            <input type="checkbox" value={category.id + 1} />
            {category.categoryName}
          </label>
        ))}
        <input type="search" placeholder="Arama Kelimesi" />
      </div>
      <button type="submit">Filter</button>
    </form>
    
  );
}

export default FilterProblem;
