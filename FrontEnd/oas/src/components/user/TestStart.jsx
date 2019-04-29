import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';


class Example extends React.Component {
  constructor(props) {
    super(props);
    //use this.props.categoryid and this.props.subcategoryid in code
    this.state = {
      testname:"Loading",
      totalmarks:"Loading",
      duration:"Loading",
      testID:-1,
      totalQuestions:-1,
      userTestID:-1,
      message:"",
      isLoading:false
    };
  }
  
  componentWillMount = () => {
    console.log(this.props);
    //Handle the response error here
    axios.get("http://172.27.233.165:5452/api/User/Test/?subcategoryid="+this.props.subcategoryid+"&categoryid="+this.props.categoryid,{
      headers: {
        "Authorization" : sessionStorage.getItem('userID')
      }
    })
    .then(response => {
        console.log(response);
        this.setState({
          testname:response.data.questionPaperName,
          totalmarks:response.data.totalMarks,
          duration:response.data.duration,
          testID:response.data.testID,
          totalQuestions:response.data.subcategoryID
        });
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
    })
    var userID = sessionStorage.getItem("userID");
    if(userID > 0){
      axios.get("http://172.27.233.165:5452/api/test/set?userID="+ userID + "&testID=" + this.state.testID,{
        headers: {
          "Authorization" : sessionStorage.getItem('userID')
        }
      })
      .then(response => {
        console.log(response.data);
          this.setState({
            userTestID:response.data
          })


      })
      .catch(error => {
        console.log(error.response);
        console.log(error);
      })

    }
    else{
      console.log("Login to continue");
    }
  }

  //change this after ajax logic  added
  componentDidMount = ()=>{
    // this.setState({
    //   testname:"Java",
    //   totalmarks:"30"
    // })
    //console.log(this.props);
  }

  render() {
    if(this.state.userTestID > 0){
      return(
          <Redirect to={{pathname:'/user/question', state:{userTestID:this.state.userTestID, totalQuestions:this.state.totalQuestions, duration: this.state.duration}}} />  
      )
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div className="text-center">
            <Label > <strong>Test Name:</strong> </Label><Label className="ml-3">  {this.state.testname}</Label>
          </div>
          
        </FormGroup>
        <FormGroup>
          <div className="text-center">
            <Label > <strong>Total Marks:</strong> </Label><Label className="ml-3">{this.state.totalmarks}</Label>
          </div>
        </FormGroup>
        <FormGroup>
          <div className="text-center">
            <Label > <strong>Duration:</strong> </Label><Label className="ml-3">{this.state.duration}</Label>
          </div>
        </FormGroup>
        <div className="text-center">
          <Button id="submit" type="submit"  className="w-25">Start</Button>
        </div>
      </Form>
    );
  }
}
export default Example;