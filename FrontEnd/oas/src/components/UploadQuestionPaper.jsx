import React from 'react';
import {Col, Button, CustomInput, Form, UncontrolledAlert, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import axios from 'axios';

export default class UploadQuestionPaper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customFile:"",
      fileExtension:"",
      subcategory:"",
      questionPaperName:"",
      duration:0,
      available:true,
      hours:0,
      minutes:0,
      radio1:"",
      categories:[],
      subCategories:[],
      isLoading:false,
      categoryid:-1, 
      subcategoryID:-1,
      message:"",
      validate:{
        questionPaperState:"",
        uploadState:"",
      }
    };
  }

  handleChange = (event) => {

    this.setState({
      [event.target.name]:event.target.value
    });

    if(event.target.name === "subcategory"){
      this.setState({
        subcategoryID:event.target.value
      });
    }

    if(event.target.name === "customFile"){
      console.log(event.target.value );
      console.log(this.state.customFile.name);
      if(event.target.value === "" && this.state.customFile.name !== "")
      {
        console.log("erorrrrrrrrrr");
      }
      else{
        this.setState({
          customFile:event.target.files[0],
          message:""
        }, ()=> {
          console.log(this.state.customFile);
          this.setState({
            fileExtension:this.state.customFile.name.split(".")[1]
          },()=>{
            this.validateFileChoosen(event);
          })
          console.log(this.state.customFile.name.split(".")[1]);
          // this.state.fileExtension = "xlsx";//this.state.customFile.name.split(".")[1];
        })
      }
    }

    if(event.target.name === "available"){
      if(event.target.value === "true"){
        this.setState({
          available:true
        }, ()=>console.log(this.state.available))
      }
      else{
        this.setState({
          available:false
        },()=>console.log(this.state.available))
      }
      
    }

    if(event.target.name === "questionPaperName")
      this.validateQuestionPaperName(event);

    if(event.target.name === "hours")
      this.getHours(event)

    if(event.target.name === "minutes")
      this.getMinutes(event)
  }

  getHours(event){this.setState({hours: Number(event.target.value*60)});}

  getMinutes(event){this.setState({minutes : Number(event.target.value)});}

  getDuration=()=>{this.setState({duration : this.state.hours + this.state.minutes});}

  validateQuestionPaperName = (e) => {
    let pattern = /[A-Za-z\d@$!%*?&]{4,20}$/;
    if(pattern.test(e.target.value)){
          this.setState({
            validate:{questionPaperState:'has-success'}
          })
          document.getElementById("submit").disabled = false;
        }
        else{
          this.setState({
            validate:{questionPaperState:'has-danger'}
          })
          document.getElementById("submit").disabled = true;
        }
  }

  validateFileChoosen = (e) => {
      
    // console.log(this.state.customFile.name.split(".")[1]);
    // this.setState({
    //   message: <UncontrolledAlert>PLease select .xlsx file only!</UncontrolledAlert>,
    // })
    let pattern = this.state.fileExtension;
    console.log(this.state.message);
    document.getElementById("submit").disabled = true;

    if(pattern === "xlsx")
    {
      console.log("correct file");
      document.getElementById("submit").disabled = false;

    }else{
      this.setState({
        message: <UncontrolledAlert color="danger">PLease select .xlsx file only!</UncontrolledAlert>,
      }, ()=>{
      console.log(this.state.message);
      })
    }
    
    console.log(pattern);
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true,
      message:""
    })
    var formData = new FormData();
    formData.append("excel",this.state.customFile);

    var payload = {
      subcategoryID: this.state.subcategoryID,
      duration: this.state.duration,
      questionPaperName: this.state.questionPaperName,
      available: this.state.available,
    }
    
    formData.append("subcategoryID",this.state.subcategoryID);
    formData.append("duration",this.state.duration);
    formData.append("questionPaperName",this.state.questionPaperName);
    formData.append("available",this.state.available);
    
    axios.post('http://172.27.233.165:5452/api/Admin/UploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization" : sessionStorage.getItem('userID')
      }
    }).then(response=>{
      console.log(response);
      this.setState({
        isLoading:false,
        message: <UncontrolledAlert>Successfully Uploaded the test!!</UncontrolledAlert>,
        customFile:""
      },()=>{
        setTimeout(() => {
          this.setState({
            message:""
          })
        }, 2000);
      })
    })
    .catch(error=>{
      this.setState({
        isLoading:false,
        message:<UncontrolledAlert color="danger" >Please enter all details!</UncontrolledAlert>
      },()=>{
        setTimeout(() => {
          this.setState({
            message:""
          })
        }, 2000);
      })
      console.log(error);
      console.log(error.response);
    })

    // axios.post("http://localhost:60676/api/Admin/UploadFile", payload)
    // .then(response=>{
    //   console.log(response);
    // })
    // .catch(error=>{
    //   console.log(error);
    //   console.log(error.response);
    // })
    console.log(this.state)
  }

  getCategoryID=(event)=>{
    var categoryID = document.getElementById('exampleSelect').value;
    console.log(categoryID);
    this.GetSubCategory(categoryID);
    
  }

  componentDidMount(){
    this.setState({
      isLoading:true
    })
    axios.get('http://172.27.233.165:5452/api/admin/category/',{
      headers: {
        "Authorization" : sessionStorage.getItem('userID')
      }
    })
    .then(response=>{
      this.setState({
        isLoading:false,
        categories:response.data,
    })
  })
    .catch(error => {
      console.log(error.response.statusText);
      this.setState({
        message:error.response.statusText
      })
    })
  }
  

  GetSubCategory(id)
  {
    axios.get("http://172.27.233.165:5452/api/admin/subcategory/?id="+id,{
      headers: {
        "Authorization" : sessionStorage.getItem('userID')
      }
    })
    .then(response => {
      this.setState({
        subCategories:response.data,
        categoryid:id
      })
      console.log(this.state.subCategories);
    })
    .catch(error => {
      console.log(error.response);
      console.log(error);
    })
  }

  render() {
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
    else{
      return (
        <Form onSubmit={this.handleSubmit} >
          <br/>
          <br/>
          <FormGroup row>
            <Label for="exampleCustomFileBrowse" sm={{size:4, offset: 1}}>Select question paper</Label>
            <Col sm={3}>
            {/* value={this.state.customFile}  */}
              <CustomInput type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="customFile" id="exampleCustomFileBrowse" onChange={this.handleChange} required/>
            </Col>
            <Col sm={3}>
              <Label for="exampleCustomFileBrowse" id="fileNameDisplay" sm={{size:4, offset: 1}}>{this.state.customFile.name}</Label>
            </Col>
          </FormGroup>

         
  
          
          <FormGroup row>
            <Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
            <Col sm={6} >
              <Input type="select" name="subcategory" id="exampleSelect" onClick = {this.getCategoryID} required>
              <option required>Select</option>
              {this.state.categories.map(item =>(
                <option  key={item.categoryID} value={item.categoryID}>{item.categoryName}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
  
          <FormGroup row>
            <Label for="exampleSelect" sm={{size:4, offset: 1}}>Select subcategory</Label>
            <Col sm={6} >
            
              <Input type="select" name="subcategory" id="exampleSelect2" onChange={this.handleChange} required>
              <option required>Select</option>
              {this.state.subCategories.map(item =>(
                <option  key={item.subcategoryID} value={item.subcategoryID}>{item.subcategoryName}</option>
                ))}
              </Input>
            
            </Col>
          </FormGroup>
  
          <FormGroup row>
            <Label for="questionPaper" sm={{size:4, offset: 1}}>Question Paper Name</Label>
            <Col sm={6}>
              <Input 
                valid={ this.state.validate.questionPaperState === 'has-success' } 
                invalid={ this.state.validate.questionPaperState === 'has-danger' }
                onChange={this.handleChange}
                required type="text"
                name="questionPaperName" 
                id="questionPaperName" 
                placeholder="example : oops"   
              />
              <FormFeedback valid> </FormFeedback>
              <FormFeedback invalid>
                Please check question paper name ...
              </FormFeedback>
            </Col>
          </FormGroup>
          
          <FormGroup row>
            <Label for="totalTime" xs={{size:4, offset: 1}}>Duration</Label>
            <Col sm ={1} xs={{size: 1}}>
              <Input type="select" name="hours" id="hoursDuration" onChange={this.handleChange} required>
                <option>00</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </Input>
            </Col>
            <Col xs={1}>
            Hour(s)
            </Col>
            <Col sm={1} xs={{size: 1, offset: 1}}>
              <Input type="select" name="minutes" id="minutesDuration" onChange={this.handleChange} required>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </Input>
            </Col>
            <Col xs={1}>
            Min(s)
            </Col>
          </FormGroup>
  
          <FormGroup row>
            <Label for="totalTime" xs={{size:4, offset: 1}}>Availability</Label>
            <Col xs={3}>
            <FormGroup check>
              <Label check >
                <input type="radio" name="available" value="true" onChange={this.handleChange} required/>{' '}available
              </Label>
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup check>
              <Label check >
                <input type="radio" name="available" value="false" onChange={this.handleChange} required/>{' '}un-available
              </Label>
            </FormGroup>
          </Col>
          </FormGroup>
  
          <div>
            <Col className="text-center">
              <Button id="submit" type="submit" download="exampleCustomFileBrowse" className="w-15" onClick={this.getDuration}>Submit</Button>
            </Col>
          </div>
          <br/>
          {this.state.message}
        </Form>
      );
    }
    
  }
}
