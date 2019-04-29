import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card, Alert} from 'reactstrap';
import NavBar from "./../NavBar";
import TestStartPopUp from './TestStartPopUp';
import axios from 'axios';
class Index extends Component{
  constructor()
  {
    super();
    this.state ={categories :[], subCategories:[], categoryid:-1, subcategoryid:-1, open:false, userid:-1, message:""}
  }
  
  GetSubCategory(id)
  {
    console.log(id);
    
    if(window.sessionStorage.getItem("userID")){
      this.setState({
        userid: window.sessionStorage.getItem("userID")
      })
      axios.get("http://172.27.233.165:5452/api/user/subcategory?userID="+window.sessionStorage.getItem("userID")+" &catID="+id,{
      headers: {
        "Authorization" : sessionStorage.getItem('userID')
      }
    })
    .then(response => {
      this.setState({
        subCategories:response.data,
        categoryid:id
      })
      console.log(this.state.subCategories.length);
      if(this.state.subCategories.length === 0)
      {
        this.setState({
          message:<Alert color="danger">No test available</Alert>
        })
      }
    })
    .catch(error => {
      console.log(error.response.statusText);
      if(error.response.statusText === "Forbidden"){
        this.setState({
          message:<Alert color="danger">Invalid user!</Alert>
        })
      }
          
          console.log(error);
    })
    // if(this.state.subCategories.length==0)
    
  }
  else{
    this.setState({
      message:<Alert>Login to Continue</Alert>
    })
  }
  
  
  
  
}
//update this after writing axios calls 
componentWillMount()
{
  axios.get("http://172.27.233.165:5452/api/user",{
  headers: {
    "Authorization" : 1
  }
})
.then(response => {
  this.setState({
    categories : response.data
  })
})
.catch(error => {
  console.log(error);
})

//this.setState({categories : [{categoryID : 1,categoryName: 'Cat1'},{categoryID : 2,categoryName: 'Cat2'},{categoryID : 3,categoryName: 'Cat3'}]})
}

SeeTest(id){
  console.log("called")
  console.log(id);
  this.setState({
    subcategoryid:id,
    open:true
  });
}
render()
{
  
  let subRender = <div></div>;
  if (this.state.subCategories.length>0) {
    subRender = <div className="bg-secondary text-center mt-3 py-3 shadow-lg">
    <h4 className="text-white">Sub-Categories</h4>
    <Row className="justify-content-center">
    
    {this.state.subCategories.map(c=>
      <Col md={5} key={c.subcategoryID}>
      <Card className="my-3">
      <CardBody>
      <CardTitle className="text-center">{c.subcategoryName}</CardTitle>
      <CardText>Some Description</CardText>
      </CardBody>
      <CardFooter>
      {/* <Button color="primary" onClick={this.SeeTest.bind(this,c.subCategoryID)}>See Test Details</Button> */}
      <TestStartPopUp subcategoryid={c.subcategoryID} categoryid={this.state.categoryid} buttonLabel = "See Test Details"/>
      </CardFooter>
      </Card>
      </Col>
      )}
      </Row>
      </div>
    }
    else{
      return (
        <div className="Index">
        <NavBar/>
        <Container>
        <h3>Categories</h3>
        <Row>
        {this.state.categories.map(c=>
          <Col md={4} key={c.categoryID}>
          <Card>
          <CardBody>
          <CardTitle className="text-center">{c.categoryName}</CardTitle>
          <CardText>Some Description</CardText>
          </CardBody>
          <CardFooter>
          <Button color="primary" block onClick={this.GetSubCategory.bind(this,c.categoryID)}>See Subcategories</Button>
          </CardFooter>
          </Card>
          </Col>
          )}
          </Row>
          {subRender}
          </Container>
          {this.state.message}
          </div>
          );
        }
        
        if(this.state.userid < 0){
          return (
            <div className="Index">
            <NavBar/>
            <Container>
            <h3>Categories</h3>
            <Row>
            {this.state.categories.map(c=>
              <Col md={4} key={c.categoryID}>
              <Card>
              <CardBody>
              <CardTitle className="text-center">{c.categoryName}</CardTitle>
              <CardText>Some Description</CardText>
              </CardBody>
              <CardFooter>
              <Button color="primary" block onClick={this.GetSubCategory.bind(this,c.categoryID)}>See Subcategories</Button>
              </CardFooter>
              </Card>
              </Col>
              )}
              </Row>
              {subRender}
              </Container>
              {this.state.message}
              </div>
              );
            }
              else{
                return(
                  <div className="Index">
                  <NavBar/>
                  <Container>
                  <h3>Categories</h3>
                  <Row>
                  {this.state.categories.map(c=>
                    <Col md={4} key={c.categoryID}>
                    <Card>
                    <CardBody>
                    <CardTitle className="text-center">{c.categoryName}</CardTitle>
                    <CardText>Some Description</CardText>
                    </CardBody>
                    <CardFooter>
                    <Button color="primary" block onClick={this.GetSubCategory.bind(this,c.categoryID)}>See Subcategories</Button>
                    </CardFooter>
                    </Card>
                    </Col>
                    )}
                    </Row>
                    {subRender}
                    </Container>
                    </div>
                    );
                  }
                  
                }
              }
              export default Index;