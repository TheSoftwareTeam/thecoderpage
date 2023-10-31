import React, { Component } from 'react';
import bir from "./img/bir.jpg";
import iki from "./img/iki.jpg"; 
import uc from "./img/uc.jpeg"; 
import dort from "./img/dort.jpeg";
import bes from "./img/bes.jpeg";
import alti from "./img/alti.jpg";
import yedi from "./img/yedi.jpeg";
import sekiz from "./img/sekiz.jpeg";

class SectionThree extends Component {
  render() {
    return (
        <section className="box-3">
        <div className="text">
          <h6>This is what we do</h6>
          <h2>Work Cases</h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas id
            eligendi iusto eos voluptatem repellat commodi nam nisi. Maiores,
            soluta!
          </p>
        </div>
        <div className="box-3-2">
          <img src={bir} alt="bir" />
          <img src={iki} alt="iki" />
          <img src={uc} alt="uc" />
          <img src={dort} alt="dort" />
          <img src={bes} alt="bes" />
          <img src={alti} alt="alti" />
          <img src={yedi} alt="yedi" />
          <img src={sekiz} alt="sekiz" />
        </div>
      </section>
    )
  }
}

export default SectionThree