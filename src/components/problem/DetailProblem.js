/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./scss/detail-problem.scss";
import UserContext from "../../context/UserContext";
import { NavLink, useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Problem from "./Problem";
const DetailProblem = () => {
  const {
    state,
    getProblemDetail,
  } = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    getProblemDetail(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div id="detail-container">
      <div id="detail-content">
        <div className="detail-aciklama">
          <div className="detail-text">
            Kod yazarken karşılaştığınız sorunları paylaşın, çözümleri birlikte
            bulalım.
          </div>
          <div className="detail-share-button">
            <button>
              <NavLink className="detail-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>
        <Problem problem={state.activeProblemDetail}/>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Sidebar />
    </div>
  );
};

export default DetailProblem;
