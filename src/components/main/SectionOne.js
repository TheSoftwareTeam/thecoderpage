import React, { Component } from "react";

class SectionOne extends Component {
  render() {
    return (
      <section className="box-1">
        <div className="box-1-1">
          <i className="icon fa-solid fa-code white-text"></i>

          <h2>Web Development</h2>
          <br />
          <p>Lorem ipsum dolor sit amet, consectetur adip</p>
        </div>
        <div className="box-1-2">
          <i className="icon fa-solid fa-mobile white-text"></i>

          <h2>Mobile App</h2>
          <br />
          <p>Lorem ipsum dolor sit amet, consectetur adip</p>
        </div>
        <div className="box-1-3">
          <i className="icon fa-solid fa-server white-text"></i>
          <h2>Server-side Development</h2>
          <br />
          <p>Lorem ipsum dolor sit amet, consectetur adip</p>
        </div>
      </section>
    );
  }
}

export default SectionOne;
