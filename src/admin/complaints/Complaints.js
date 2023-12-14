import React, { useContext, useEffect } from 'react'
import AdminContext from '../../context/AdminContext';
import FilterComplaint from "../filters/FilterComplaint";
import Complaint from './Complaint';
import './scss/complaints.scss'

const Complaints = () => {
    const { state,getComplaints } =
    useContext(AdminContext);
    useEffect(() => {
        document.title = 'Complaints | Admin'
        getComplaints(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    )
  return (
   
    <div id="complaints-container">

    <div id="complaints-list">
    <FilterComplaint />
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
            onClick={ async() =>  getComplaints(true)}
            className="list-load-more"
          >
            Daha Fazla
          </button>
        )
        }
  <p className='pages-items-count'>
 Sonuç sayısı :  {state.complaints.length}
  </p>
  </div>
  )
}

export default Complaints