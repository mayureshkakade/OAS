import React, { Component } from 'react';
import axios from 'axios';
import { UncontrolledAlert,Container, Col, Form, FormGroup, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card, CardSubtitle, Badge, Table, Alert} from 'reactstrap';

export default class FailedStudent extends Component{
    constructor(){
        super();
        this.state = {
            isComplete:false,
            students: [],
						message:"",
						isLoading:true,
        }
    }

    componentWillMount(){
        this.setState({
            isComplete:false,
            students: [{}],
        })
        axios.get("http://172.27.233.165:5452/api/FailedStudents",{
          headers: {
            "Authorization" : sessionStorage.getItem('userID')
          }
        })
        .then(response => {
					console.log(response);
					this.setState({
						students: response.data,
            isLoading:false,
            message:<Alert color="success">All are passed!</Alert>
					});
        })
        .catch(error => {
          console.log(error.response.statusText);
          this.setState({
            message:error.response.statusText
          })
          console.log(error);
        })
    }

    SubmitForm(e)
    {
      document.getElementById("submit").innerHTML = "Loading...";
      let retestIDs=[];
      if(!e.target.elements.testID.length){
        let element = e.target.elements.testID;
            //console.log( index);
            console.log(element);
            if (element.checked) {
                retestIDs.push(parseInt(element.value));
            }
      }
      else{
        console.log(e.target.elements.testID.length);
        
        e.preventDefault();
        for (let index = 0; index < e.target.elements.testID.length; index++) {
            let element = e.target.elements.testID[index];
            console.log( index);
            console.log(element);
            if (element.checked) {
                retestIDs.push(parseInt(element.value));
            }
        }
      }
        console.log(retestIDs);
        //send retest ids in ajax

        let payload = {
            uTestID : retestIDs
          }
          axios.post("http://172.27.233.165:5452/api/FailedStudents", retestIDs,{
            headers: {
              "Authorization" : sessionStorage.getItem('userID')
            }
          })
          .then(response => {
            this.setState({
              isLoading:false
            })
            console.log(response);
            if(response.statusText === "OK"){
							console.log("Retests added");
							this.setState({
								isComplete:true,
							});
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
    }

    render()
    {
      console.log(this.state.students.length);
      if(this.state.students.length === 0)
      {
        return (
            <div>{this.state.message}</div>
        );
      }else{
      if(this.state.isComplete){
        window.location.reload();
      }
			if (this.state.isLoading){
        if(this.state.message === "Forbidden"){
          return(
            <div className="row h-100 align-items-center">
              <div className="container mt-4 ">
                <div className="col-8 mx-auto my-auto">
                  <div className="jumbotron text-center">
                    <h1>Access Denied</h1> 
                  </div>
                </div>
              </div>
            </div>
          );
        }
        else{
          return(
            <div>Loading..</div>
          );
        }
      } 
      else {
				return(
					<Container className="Failed">
					<h2>Failed Students</h2>
					{this.state.isComplete && <UncontrolledAlert>Retests made available!</UncontrolledAlert>}
					<Form className="form" onSubmit={this.SubmitForm.bind(this)}>
						<Table>
							<thead>
								<tr>
									<th>Test Name</th>
									<th>Status of Test</th>
									<th>User Name</th>
									<th>&#9745;</th>
								</tr>
							</thead>
							<tbody>
								{this.state.students.map((s)=>
									<tr>
										<td>{s.test.questionPaperName}</td>
										<td>{s.statusOfTest}</td>
										<td>{s.user.name}</td>
										<td>
											<input
												type="checkbox"
												value={s.userTestID}
												name="testID"
											/>
										</td>
									</tr>
								)}
							</tbody>
						</Table>
						<Col md={4}>
            <Button id="submit">Submit</Button>
						</Col>
					</Form>
				</Container>
			);
			}
    }
  }
}