import React, { Component } from 'react'
import profile1 from "./img/profile1.jpeg";
import profile2 from "./img/profile2.jpeg";
import profile3 from "./img/profile3.jpeg";


class SectionFive extends Component {
  render() {
    return (
        <section className="box-5">
        <div className="text">
          <h6>Who we are</h6>
          <h2>Our Professional Team</h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas id
            eligendi iusto eos voluptatem repellat commodi nam nisi. Maiores,
            soluta!
          </p>
        </div>
        <div className="box-5-2">
          <div>
            <img src={profile1} alt="profile1" />
            <h6>Kevin Malone</h6>
            <p>Marketing</p>
          </div>
          <div>
            <img src={profile2} alt="profile2" />
            <h6>Michael Scott</h6>
            <p>President</p>
          </div>
          <div>
            <img src={profile3} alt="profile3" />
            <h6>Dwight Schrute</h6>
            <p>CTO</p>
          </div>
        </div>
      </section>
    )
  }
}

export default SectionFive