import React, { useContext, useEffect } from "react";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Footer = () => {
  const { dispatch } = useContext(UserContext);

  return (
    <div className="footer">
      <NavLink
        onClick={() => {
          dispatch({ type: "selectedCategory", payload: null });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="navi-link"
        to="/home/main"
      >
        <h3>TheCoderPage</h3>
      </NavLink>

      <h5>Copyright © Murat-Mahir / Tüm hakları saklıdır</h5>
    </div>
  );
};

export default Footer;
