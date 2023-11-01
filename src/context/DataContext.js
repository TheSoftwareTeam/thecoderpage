import React, { createContext, useEffect, useReducer } from 'react'
import {reducer, initialState} from '../reducer/reducer';
import axios from 'axios';

const DataContext=createContext();

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getCategory= async()=>{
        const response=await axios.get("http://localhost:3005/categories");
        dispatch({type:"getCategory",payload:await response.data})
    }

    const getProblem= async()=>{
      const response=await axios.get("http://localhost:3005/problems");
      dispatch({type:"getProblems",payload:await response.data})
  }

  const getComments= async()=>{
    const response=await axios.get("http://localhost:3005/comments");
    dispatch({type:"getComments",payload:await response.data})
}

// const getUserInfo=async(id)=>{
//   const response=await axios.get(`http://localhost:3005/users/${id}`);
//   dispatch({type:"getUserInfo",payload:await response.data})
// }

useEffect(()=>{
  getCategory();
  getProblem();
  getComments();
},[])


  return (
    <DataContext.Provider value={{state,dispatch}}>
    {children}
    </DataContext.Provider>
  )
}

export default DataContext