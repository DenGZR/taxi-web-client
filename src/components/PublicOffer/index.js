import React, { Component } from 'react'
import { Link } from 'react-router'

class PublicOffer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    console.log("PublicOffer");
        return (
          <div className="container-fluid  public-offer-page">
            <main className="main-content">
              <section id="main-banner" className="main-banner page-block">
                <div className="bg-main-banner"></div>
              </section>
            </main>
          </div>
        )
  }
}

export default PublicOffer;
