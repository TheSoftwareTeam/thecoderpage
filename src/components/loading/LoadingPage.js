import React, { useEffect } from 'react'
import loading from '../../images/loading.gif'
import { useNavigate } from 'react-router-dom'
import "./loading.scss"


const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
       navigate("home/listproblem/hersey") 
    },100)
  })
  return (
    <div className='loading'>
        <img src={loading} alt="loading" />
    </div>
  )
}

export default LoadingPage