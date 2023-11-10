/* eslint-disable array-callback-return */
import React, { createContext,    useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";


 
  const getProblemDetail = async (id) => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
    await dispatch({ type: "activeProblemDetail", payload: response.data });
  };
 
  const deleteProblem = async (id) => {
   
    const response = await axios.patch(`${url}/problems/${id}`, { isDeleted: true });
    if (response.status === 200) {
      dispatch({ type: "problemSil", id });
      navigate(`/admin/problems`);
    }
  };


  


  return (
    <AdminContext.Provider
      value={{
        state,
        dispatch, 
        deleteProblem,
        getProblemDetail,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
