import React from "react";
import Sidebar from "../sidebar/Sidebar";


const ListProblem = () => {
  return (
    <div>
      <div className="aciklama">
        <div>
          Açıklama Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy
        </div>
        <button>Problem Paylaş</button>
      </div>
      <div className="list-problem">Liste</div>
      <Sidebar/>
    </div>

  );
};

export default ListProblem;
