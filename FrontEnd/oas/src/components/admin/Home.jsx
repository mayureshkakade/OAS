import React, { Component } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import { UncontrolledAlert,Container, Col, Form, FormGroup, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card, CardSubtitle, Badge, Table, Alert} from 'reactstrap';

export default class Home extends Component{
    constructor()
    {
        super();
        this.state={user:{},

        }
    }
    
    componentWillMount(){
        this.setState({
            user: {userID: parseInt(sessionStorage.getItem('roleID'))}
        });
    }

    render(){
        if (this.state.user.userID===2) {
            return(
                <div className="row">
                    <Card className="col-sm-4 m-3">
                        <CardBody>
                            <CardTitle className="text-center">ADD TEST</CardTitle>
                            <CardText>Set a new test</CardText>
                        </CardBody>
                        <CardFooter>
                        <Link to="/admin/uploadfile">Add Test</Link>
                        </CardFooter>
                    </Card>
                    <Card className="col-sm-4 m-3">
                        <CardBody>
                            <CardTitle className="text-center">ADD CATEGORY</CardTitle>
                            <CardText>Add a new Category</CardText>
                        </CardBody>
                        <CardFooter>
                        <Link to="/admin/getcategory">Add Category</Link>
                        </CardFooter>
                    </Card>
                    <Card className="col-sm-4 m-3">
                        <CardBody>
                            <CardTitle className="text-center">ADD SUB-CATEGORY</CardTitle>
                            <CardText>Add a new sub-category to existing category</CardText>
                        </CardBody>
                        <CardFooter>
                        <Link to="/admin/subcategory">Add Sub-category</Link>
                        </CardFooter>
                    </Card>
                    <Card className="col-sm-4 m-3">
                        <CardBody>
                            <CardTitle className="text-center">EDIT QUESTION</CardTitle>
                            <CardText>Edit existing question</CardText>
                        </CardBody>
                        <CardFooter>
                        <Link to="/admin/questions">Edit Question</Link>
                        </CardFooter>
                    </Card>
                    <Card className="col-sm-4 m-3">
                        <CardBody>
                            <CardTitle className="text-center">FAILED STUDENTS</CardTitle>
                            <CardText>Get list of failed students and get a re-test</CardText>
                        </CardBody>
                        <CardFooter>
                        <Link to="/admin/failed">View Failed Students</Link>
                        </CardFooter>
                    </Card>
                </div>
            )    
        } else {
           return (
            <div className="row h-100 align-items-center">
            <div className="container mt-4 ">
              <div className="col-8 mx-auto my-auto">
                <div className="jumbotron text-center">
                  <h1>Access Denied</h1> 
                </div>
              </div>
            </div>
          </div>
           )
        }
        
    }
}