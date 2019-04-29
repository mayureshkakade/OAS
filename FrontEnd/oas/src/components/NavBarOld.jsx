import React, { Component } from 'react';
import { Link,BrowserRouter } from 'react-router-dom';


export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary fixed-top">
      <BrowserRouter>
        <Link className="navbar-brand" to="/">
          Learn&Excel
        </Link>
      </BrowserRouter>
      </nav>
      )
    }
  }
