import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light" id="topnav">
        <div className="container">
          <a className="navbar-brand mr-auto" href="#!">
            <img
              src="./img/header-logo.png"
              alt="..."
              className="navbar-brand-img"
            />
          </a>
        </div>
      </nav>
    );
  }
}
