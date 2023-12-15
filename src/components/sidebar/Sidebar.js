/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./sidebar.scss";
import UserContext from "../../context/UserContext";
import UserPicture from "../problem/UserPicture";
import LikeCommend from "../problem/LikeCommend";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { state,dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      {state.populerProblems.map((problem) => (
        <div key={problem.id} className="sidebar-list-problem">
         <UserPicture userId={problem.userId}/>
          <div className="sidebar-problem-detail">
            <div className="sidebar-problem-head-text">
              {problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}
              <hr />
              <h3
               onClick={() => {
                dispatch({ type: "selectedCategory", payload: null });
                navigate(`/home/detailproblem/${problem.id}`);
              }}>{problem.problemHead.slice(0, 100)}</h3>
              {/* <p
              onClick={() => {
                dispatch({ type: "selectedCategory", payload: null });
                navigate(`/home/detailproblem/${problem.id}`);
              }}>
                {problem.problemContent.slice(0, 100) + "..."}
                <p
                  
                  className="click-to-detail"
                >
                  Detayı görmek için tıklayınız.
                </p>
              </p> */}
            </div>
          <LikeCommend problem={problem}/>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
