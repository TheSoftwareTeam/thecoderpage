import React, { Component } from 'react'
import officeman from "./img/officeman.jpg";

class SectionSix extends Component {
  render() {
    return (
        <section className="box-6">
        <div className="section-content-left-right-img">
          <img src={officeman} alt="officeman" />
        </div>

        <div className="box-6-2">
          <h2>Request Callback</h2>
          <input type="text" placeholder="Enter name" />
          <input type="text" placeholder="Enter email" />
          <input type="text" placeholder="Enter phone" />
          <button className="btn">Send</button>
        </div>
      </section>
    )
  }
}

export default SectionSix