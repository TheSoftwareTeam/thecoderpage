/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./sidebar.scss";
import UserContext from "../../context/UserContext";
import UserPicture from "../problem/UserPicture";
import LikeCommend from "../problem/LikeCommend";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      {state.populerProblems.map((problem) => (
        <div key={problem.id} className="sidebar-list-problem">
          <UserPicture
            userId={problem.userId}
            createDate={problem.createDate}
            isDisabled={true}
          />
          <div className="sidebar-problem-detail">
            <div
              onClick={() => {
                dispatch({ type: "selectedCategory", payload: null });
                navigate(`/home/detailproblem/${problem.id}`);
              }}
              className="sidebar-problem-head-text"
            >
              {problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}
              <hr />
              <h3>{problem.problemHead.slice(0, 100)}</h3>
              <p className="click-to-detail">Detayı görmek için tıklayınız.</p>
            </div>
            <LikeCommend problem={problem} isDisabled={true} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
