import React from 'react'
import "./create-problem.scss"

const CreateProblem = () => {
  return (
    <div className='create-content'>
      <h2>Problem oluştur</h2>
      <div className="aciklama">
        <div className="text">
          Açıklama Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy
        </div>
      
        
      </div>
      <form>
        <select>
          <option>HTML</option>
          <option>CSS</option>
          <option>JavaScript</option>
          <option>C#</option>
          <option>React</option>
          <option>java</option>
        </select>
        <input type='text' placeholder='Başlık'/>
        <textarea type='text' placeholder='İçerik'/>
        <input type='submit' value='Kaydet'/>
      </form>
    </div>
  )
}

export default CreateProblem