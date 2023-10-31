import React, { Component } from "react";
import office from './img/office.jpg';


class SectionTwo extends Component {
  render() {
  
    return (
      <section className="box-2">
        <div className="section-content-left-right-img">
          <img src={office} alt="office" />
        </div>
        <div className="section-content-left-right-article article-color-1">
          <h6>What you are developing for</h6>
          <h2>We provide the best solutions</h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            laborum asperiores quia omnis illum, illo voluptatem aliquid dolore
            voluptate temporibus id qui ducimus soluta quibusdam eos incidunt.
            Minima, architecto et!
          </p>
          <button className="btn btn-1">
            <i className="fa-solid fa-angle-right"></i> Learn More
          </button>
        </div>
      </section>
    );
  }
}

export default SectionTwo;
