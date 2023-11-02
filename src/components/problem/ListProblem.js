/* eslint-disable jsx-a11y/alt-text */
import React, { useContext} from "react";
import Sidebar from "../sidebar/Sidebar";
import './list-problem.scss'
import { NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";
const ListProblem = () => {
  const {state}=useContext(DataContext)

  return (
    <div id="container">
    <div id="content">
    
      <div className="aciklama">
        <div className="text">
          Açıklama Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy
        </div>
        <div className="share-button"><button><NavLink className="link" to="/home/createproblem">Problem Paylaş</NavLink></button></div>  
      </div>
         {
          state.problems.map((problem)=>

           <div key={problem.id} className="list-problem">
        <div className="user-picture">
          <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"/>
          <h3>{state.users.map((user)=>
          {
            if(user.id===problem.userId)
            {
              return user.userName
            }
          }
            
            )}
            </h3>
        </div>
        <div className="problem-detail">
        <div className="problem-head-text">
            <h3>{problem.problemHead}</h3>
            <br/>
            <p>data.problemContent</p>
        </div>
          
          <div className="problem-comment-view">
            <button>❤️365</button>
            <button>✉️data.commentCount</button>
          </div>

          <div className="write-comment">
              <textarea placeholder="Yorum yaz.."/>
          <button>Gönder</button>
          </div>

          {
        //   state.comments.map((comment)=>
        //  <div key={comment.id} className="user-comment">
        //     <div  className="comment-user-picture">
        //       <img  src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"/>
        //   <h4>users-{comment.userId}</h4>
        //     </div>
          
        //   <p>{comment.commentContent}</p>
        // </div>
        //  )
          }
          
        </div>
    </div>
    )
         }
    

    
        
    </div>
     <Sidebar />
    </div>
  );
};

export default ListProblem;
