import React, { Component } from 'react'
import laptop from "./img/sekiz.jpeg";

class SectionFour extends Component {
  render() {
    return (
      <section className="box-4">
      <div className="section-content-left-right-article article-color-2">
        <h6>March 26 2023</h6>
        <h2>Blog #3</h2>
        <br />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
          reprehenderit exercitationem at necessitatibus minus nostrum aliquid
          non distinctio veniam facilis! Animi id natus voluptates totam.
          Assumenda eum odio nobis beatae.
        </p>
        <button className="btn btn-2">Read More</button>
      </div>
      <div className="section-content-left-right-img">
        <img src={laptop} alt="laptop" />
      </div>
    </section>
    )
  }
}

export default SectionFour