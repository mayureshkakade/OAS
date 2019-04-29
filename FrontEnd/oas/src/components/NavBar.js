import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoggedIn:false
    };
  }

  componentWillMount = () => {
    if(sessionStorage.getItem("userID") > 0){
      this.setState({
        isLoggedIn:true
      })
    }
  }

  performLogOut = ()=> {
    this.setState({
      isLoggedIn:false
    })
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("roleID");
    localStorage.setItem("username","");
    localStorage.setItem("userID",-1);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

    if(this.state.isLoggedIn){
      return (
        <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Learn&Excel</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
        <NavLink href="#"> Hello {sessionStorage.getItem("username")}  </NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#"> <Button onClick={this.performLogOut}>Log Out</Button>   </NavLink>
        </NavItem>
        </Nav>
        </Collapse>
        </Navbar>
        </div>
      );
    }
    else{
      return (
        <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Learn&Excel</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
        <NavLink href="#"> <LoginModal buttonLabel = "Login"/> </NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#"><RegisterModal buttonLabel = 
        "Register"/></NavLink>
        </NavItem>
        </Nav>
        </Collapse>
        </Navbar>
        </div>
      );
    }
  }
}
  
