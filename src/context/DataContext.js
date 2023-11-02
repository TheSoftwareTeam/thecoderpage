/* eslint-disable array-callback-return */
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

const getUsers= async()=>{
  const response=await axios.get("http://localhost:3005/users");
  dispatch({type:"getUsers",payload:await response.data})
}

// const getProblemDetail=()=>{
//       state.problems.map(async(problem) => {
//       const responseUser=await axios.get(`http://localhost:3005/users/${problem.userId}`);
//       const responseCategory=await axios.get(`http://localhost:3005/categories/${problem.categoryId}`);
//       dispatch(
//         {type:"getProblemsDetail",
//           payload:{
//           problem:problem,
//           userName:responseUser.data.userName,
//           categoryName:responseCategory.data.categoryName
//         }
//       }
//     )
      
       
  
//     })
//   } 
 

useEffect(()=>{ 
   getProblem();
  getCategory();
  getComments();
  getUsers();

},[])

  return (
    <DataContext.Provider value={{state,dispatch}}>
    {children}
    </DataContext.Provider>
  )
}

export default DataContext