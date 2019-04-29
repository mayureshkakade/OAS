import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname:"",
      gender:"",
      username: "",
      password: "",
      confirmpassword: "",
      isLoading:false,
      message:"",
      email:"",
      validate:{
        emailState:"",
        passwordState:"",
        usernameState:"",
        confirmpasswordState:""
      }
    };
  }

  validateUsername = (e) => {
    let pattern = /^([a-zA-Z]+){4,10}$/;
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

  validatePassword = (e) => {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    if(pattern.test(e.target.value)){
      this.setState({
        validate:{passwordState:'has-success'}
      })
      document.getElementById("submit").disabled = false;
    }
    else{
      this.setState({
        validate:{passwordState:'has-danger'}
      })
      document.getElementById("submit").disabled = true;
    }
  }

  validateConfirmPassword = (event) => {
    if(event.target.value === this.state.password){
      this.setState({
        validate:{confirmpasswordState:'has-success'}
      })
      document.getElementById("submit").disabled = false;
    }
    else{
      this.setState({
        validate:{confirmpasswordState:'has-danger'}
      })
      document.getElementById("submit").disabled = true;
    }
  }
  
  validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(e.target.value)) {
        this.setState({ validate:{emailState : 'has-success' }})
        document.getElementById("submit").disabled = false;
      } else {
        this.setState({ validate:{emailState : 'has-danger' }})
        document.getElementById("submit").disabled = true;
      }
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
    if(event.target.name === "email")
      this.validateEmail(event);
    if(event.target.name === "password")
      this.validatePassword(event);
    if(event.target.name === "confirmpassword")
      this.validateConfirmPassword(event);
    if(event.target.name === "username")
      this.validateUsername(event);
  }

  handleSubmit = (event) => {
    console.log("valid input");
    event.preventDefault();
    this.setState({
      isLoading:true
    })
    let payload = {
      username:this.state.username,
      passw:this.state.password,
      email:this.state.email,
      gender:this.state.gender,
      name:this.state.firstname
    }
    axios.post("http://172.27.233.165:5452/api/User/Register", payload)
    .then(response => {
      this.setState({
        isLoading:false
      })
      console.log(response);
      if(response.statusText === "OK"){
        console.log("displayed");
        this.setState({
          message:<Alert color="success">Successfully Registered!</Alert>
        })

        setTimeout(()=>{
          window.location.reload();
        },1500)
      }
      else{
        this.setState({
          message:<Alert color="danger">Oops! Please try again!</Alert>
        })
      }
    })
    .catch(error => {
      console.log(error.response); 
      this.setState({
        isLoading:false
      })
      if(error.response){
        this.setState({
          message:<Alert color="danger">{error.response.data.Message}</Alert>
        })
      }
      else{
        this.setState({
          message:<Alert color="danger">Oops! Please try again!</Alert>
        })
      }
    }
    );
    console.log(this.state);
  }

  componentDidUpdate = () =>{
    if(this.state.isLoading){
      document.getElementById("submit").innerHTML = "Submitting..."
    }
    else{
      document.getElementById("submit").innerHTML = "Register"
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="firstname">First Name</Label>
        <Input state="success" onChange={this.handleChange} required type="text" name="firstname"
        id="firstname" placeholder="Your name" />
      </FormGroup>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input required valid={ this.state.validate.usernameState === 'has-success' } 
        invalid={ this.state.validate.usernameState === 'has-danger' } onChange={this.handleChange} type="text" name="username"
        id="username" placeholder="username" />
        <FormFeedback valid>
          Accepted.
        </FormFeedback>
        <FormFeedback invalid>
        <ul>
          <li>Minimum length 4</li>   
          <li>Only letters allowed</li>
        </ul>
        </FormFeedback>
      </FormGroup>
      <FormGroup id="gender" tag="fieldset">
        <FormGroup inline={true} check>
          <Label check>
          <Input onChange={this.handleChange} type="radio" value="male"
          name="gender" required/>{' '}
          Male
          </Label>
        </FormGroup>
        <FormGroup inline={true} check>
          <Label check>
          <Input onChange={this.handleChange} type="radio" value="female"
          name="gender" />{' '}
          Female
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input required valid={ this.state.validate.emailState === 'has-success' } 
        invalid={ this.state.validate.emailState === 'has-danger' } onChange={this.handleChange} type="email" name="email"
        id="email" placeholder="xyz@sss.com" />
        <FormFeedback valid>
          Valid Email Address
        </FormFeedback>
        <FormFeedback invalid>
          Uh oh! Please input a correct email.
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input required valid={ this.state.validate.passwordState === 'has-success' } 
        invalid={ this.state.validate.passwordState === 'has-danger' } onChange={this.handleChange} type="password" name="password"
        id="password" placeholder="password" />
        <FormFeedback valid>
          Strong
        </FormFeedback>
        <FormFeedback invalid>
          <ul>
            <li>At least one upper case English letter</li>   
            <li>At least one lower case English letter</li>
            <li>At least one digit</li>
            <li>At least one special character</li>  
            <li>Minimum Length eight</li>
          </ul>
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="confirmpassword">Confirm Password</Label>
        <Input required valid={ this.state.validate.confirmpasswordState === 'has-success' } 
        invalid={ this.state.validate.confirmpasswordState === 'has-danger' } onChange={this.handleChange} type="password"
        name="confirmpassword" id="confirmpassword" placeholder="confirm password" />
        <FormFeedback valid>
          Match
        </FormFeedback>
      </FormGroup>
      <div className="text-center">
        <Button id="submit" type="submit" className="w-25">Register</Button>
      </div>
      <div id="alertbox">
      <br></br>
      {this.state.message}
      </div>
      </Form>
      );
    }
  }
