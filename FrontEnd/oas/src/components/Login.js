import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';


class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember:false,
      isLoading:false,
      toUserIndex:false,
      toAdminIndex:false,
      message:"",
      validate:{
        passwordState:"",
        usernameState:""
      }
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
    if(event.target.name === "username")
      this.validateUsername(event);
  }

  setRememberMe = (event) => {
    this.setState({
      [event.target.name]:event.target.checked
    })
  }
  
  validateUsername = (e) => {
    let pattern = /^[a-zA-Z]+$/;
    if(pattern.test(e.target.value)){
      this.setState({
        validate:{usernameState:'has-success'}
      })
      document.getElementById("submit").disabled = false;
    }
    else{
      this.setState({
        validate:{usernameState:'has-danger'}
      })
      document.getElementById("submit").disabled = true;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
    })

    let payload = {
      username:this.state.username,
      password:this.state.password
    }
    
    axios.post("http://172.27.233.165:5452/api/Login/Login", payload)
    .then(response => {
      console.log(response);
      // create a new "State" object without mutating 
      // the original State object. 
      // const newState = Object.assign({}, this.state, {
      //   contacts: newContacts
      // });
      this.setState({
        isLoading:false
      })
      if(response.statusText === "OK"){
        console.log("displayed");
        console.log(response.data);
        if(response.data.roleID === 1){
          this.setState({
            message:<Alert color="success">Successfully LoggedIn!</Alert>,
            toUserIndex:true,
          })
        }
        else{
          this.setState({
            message:<Alert color="success">Successfully LoggedIn!</Alert>,
            toAdminIndex:true,
          }
        )}
       // this.props.history.push("./user/Index.jsx");
      }
      else{
        this.setState({
          message:<Alert color="danger">Oops! Please try again!</Alert>,
        })
        
      }
      sessionStorage.setItem("userID",response.data.userID);
          sessionStorage.setItem("username",response.data.username);
          sessionStorage.setItem("roleID",response.data.roleID);
          if(this.state.remember){
            localStorage.setItem("rememberme", this.state.remember);
            localStorage.setItem("userID",response.data.userID);
            localStorage.setItem("username",response.data.username);
           } 
      
      window.location.reload();
    })
    .catch(error => {
      console.log(error); 
      this.setState({
        isLoading:false
      })
      this.setState({
        message:<Alert color="danger">Oops! Please try again!</Alert>
      })
    });
  }

  componentDidUpdate = () =>{
    
    if(this.state.isLoading){
      document.getElementById("submit").innerHTML = "Loading..";
    }
    else if(this.state.toUserIndex == false && this.state.toAdminIndex == false){
      document.getElementById("submit").innerHTML = "Login"
    }
    
  }
  render() {
    if(this.state.toUserIndex){
      return(
          <Redirect to='/' />  
      )
    }
    else if(this.state.toAdminIndex){
      return(
        <Redirect to='/admin/home' />  
    )
    }
    return (
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input valid={ this.state.validate.usernameState === 'has-success' } 
        invalid={ this.state.validate.usernameState === 'has-danger' } onChange={this.handleChange} required type="text"
        name="username" id="username" placeholder="username" />
        <FormFeedback valid>
        </FormFeedback>
        <FormFeedback invalid>
          Please Check Username.
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="pass">Password</Label>
        <Input onChange={this.handleChange} required type="password"
        name="password" id="password"  placeholder="password" />
      </FormGroup>
      <FormGroup check>
        <Label check>
        <Input name="remember" onChange={this.setRememberMe}
        type="checkbox" />{' '}
        Remember Me?
        </Label>
      </FormGroup>
      <div className="text-center">
        <Button id="submit" type="submit"  className="w-25">Login</Button>
      </div>
      <div id="alertbox">
      <br></br>
      {this.state.message}
      </div>
      </Form>
      );
    }
  }

  export default Example;