import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './scss/search.scss';
const Search = () => {
    const { state,dispatch,getSearchList } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
   let blurTimeout;
  return (
    <div className='search-container'>
            <input onChange={(e)=>{
                dispatch({type:"filterSearch",payload:e.target.value});
                getSearchList();
            }} 
            onFocus={()=>{
                clearTimeout(blurTimeout);
                setIsOpen(true);
            }}
            onBlur={()=>{
                blurTimeout = setTimeout(() => setIsOpen(false), 200);
            }}
            type="search" placeholder="Lütfen aramak istediğiniz kelimeyi yazınız..." />
        <div className={isOpen?"show-search-list":"hidden-search-list"}>
            {state.searchList.length>0&&state.searchList.map((problem) => (
                <div key={problem.id}>
                    <h2 onClick={()=>navigate(`/home/detailproblem/${problem.id}`)}>{problem.problemHead.slice(0,70)}..</h2>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default Search