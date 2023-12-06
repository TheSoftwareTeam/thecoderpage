import React, { useContext, useEffect } from 'react'
import AdminContext from '../../context/AdminContext';
import Complaint from './Complaint';
import './scss/complaints.scss'

const Complaints = () => {
    const { state,getComplaints } =
    useContext(AdminContext);
    useEffect(() => {
        document.title = 'Complaints | Admin'
        getComplaints(4,false);
    }, []
    )
  return (
   
    <div id="complaints-container">

    <div id="complaints-list">

    {state.complaints.sort((a, b) => {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateB - dateA;
        }).map(
      (complaint) =>
        !complaint.isDeleted && (
         <Complaint complaint={complaint}/>
        )
    )}
    </div>
    {
        state.loadMoreButton&& (
          <button
            onClick={ async() =>  getComplaints(2,true)}
            className="list-load-more"
          >
            Daha Fazla
          </button>
        )
        }
  </div>
  )
}

export default Complaints