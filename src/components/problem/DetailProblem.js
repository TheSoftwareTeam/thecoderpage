/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from 'react'
import Sidebar from "../sidebar/Sidebar";
import "./detail-problem.scss"
import DataContext from '../../context/DataContext';
const DetailProblem = () => {
  const {state}=useContext(DataContext)
 const veri=state.problemDetailPage;
  return (
    <div id="container">
    <div id="content">
      <div className="aciklama">
        <div className="text">
          Açıklama Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy
        </div>
        <div className="share-button"><button>Problem Paylaş</button></div>
        
      </div>
{
  
}
      <div className="list-problem">
        <div className="user-picture">
          <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"/>
          <h3>Muratokur3</h3>
        </div>
        <div className="problem-detail">
        <div className="problem-head-text">
            <h3>{veri.problemHead}</h3>
            <br/>
            <p>{veri.problemContent}</p>
        </div>
          
        <div className="problem-comment-view">
            <button>❤️{veri.likeCount}</button>
            <button>✉️{veri.commentCount}</button>
          </div>

          <div className="write-comment">
              <textarea placeholder="Yorum yaz.."/>
          <button>Gönder</button>
          </div>

          {
          state.comments.map((comment)=>
          comment.problemId===veri.id?
         <div key={comment.id} className="user-comment">
            <div  className="comment-user-picture">
              <img  src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"/>
          <h4>{state.users.map( user=> user.id===comment.userId?user.userName:"")}</h4>
            </div>
          
          <p>{comment.commentContent}</p>
        </div>:""
         )
          }

       
        </div>
      </div>


    </div>
     <Sidebar />
    </div>
  )
}

export default DetailProblem