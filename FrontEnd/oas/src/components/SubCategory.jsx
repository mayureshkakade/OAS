import React, { Component } from 'react';
import { Container, Col,Table, Form, FormGroup, Label, Input, UncontrolledAlert, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card} from 'reactstrap';
import axios from 'axios';

export default class subCategory extends Component{
	constructor(props)
	{
		super(props);
		//this.toggle=this.toggle.bind(this);
		this.state ={
			Categories :[],
			srNo:0,
			isLoaded:false,
			inputValue: -1,
			subCategories:[],
			subCategoriesLoaded:false,
			text:"",
			message : "",
			isPresent:0,
			validate : {
				subCategoryState:""
			}
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	validateSubCategory = (e) => {
		let pattern = /^[a-zA-Z]+$/;
		if(pattern.test(e.target.value)){
			this.setState({
				validate:{subCategoryState:'has-success'}
			})
			document.getElementById("submit").disabled = false;
		}
		else{
			this.setState({
				validate:{subCategoryState:'has-danger'}
			})
			document.getElementById("submit").disabled = true;
		}
	}
	
	componentDidMount()
	{
		axios.get('http://172.27.233.165:5452/api/admin/category',{
		headers: {
			"Authorization" : sessionStorage.getItem('userID')
		}
	})
	.then(response=>{
		this.setState({
			isLoaded:true,
			Categories:response.data,
		})
	})
	.catch(error=>{
		console.log(error.response.statusText);
          this.setState({
            message:error.response.statusText
          })
          console.log(error);
	});
	
	
	
}

updateInputValue=evt=> {
	// this.setState({
	//   inputValue:evt.target.value,
	
	
	// });
	var x =document.getElementById("cat").value;
	this.state.inputValue=x;
	console.log(x)
	axios.get('http://172.27.233.165:5452/api/Admin/subcategory/?id='+x,{
	headers: {
		"Authorization" : sessionStorage.getItem('userID')
	}
})
.then(response => {
	this.setState({
		subCategories : response.data,
		subCategoriesLoaded:true,
		srNo : 0,
	})
})
}


handleChange(e) {
	//console.log(this.state.text);
	
	
	this.setState({ text: e.target.value,
		srNo:0, });
	if(e.target.name === "text")
	this.validateSubCategory(e);
}

handleSubmit(e) {
	e.preventDefault();
	
	if (!this.state.text.length) {
		return;
	}
	let subCategory = {
		subCategoryName:this.state.text,
		is_Active:true,
		categoryID:this.state.inputValue,
		created_by: sessionStorage.getItem('username')

	}
	document.getElementById("submit").innerHTML = "Loading.."
	console.log(subCategory);
	console.log(this.state.subCategories);
	if (this.state.subCategories.length===0) {
		axios.post("http://172.27.233.165:5452/api/Admin/AddSubCategory", subCategory,{
				headers: {
					"Authorization" : sessionStorage.getItem('userID')
				}
			})
			.then(response =>{
				this.setState({
					isLoaded : true,
					srNo : 0,
					message : <UncontrolledAlert>Added  Sub Category!</UncontrolledAlert>
				})
				console.log(this.state.isLoaded);
				if(this.state.isLoaded)
				{
					document.getElementById("submit").innerHTML = "Add";
					document.getElementById("new-todo").value = "";
				}
				setTimeout(()=>{
					this.setState({
						message:"",
						srNo : 0,
					})
				}, 1000)
				
				this.updateInputValue();
				
			});
	}
	for(let i=0; i<this.state.subCategories.length; i++)
	{
		console.log(this.state.subCategories[i].subcategoryName);
		if(this.state.subCategories[i].subcategoryName.toLocaleLowerCase() === subCategory.subCategoryName.toLocaleLowerCase())
		{
			this.setState({
				message: <UncontrolledAlert>Sub Category Already present!</UncontrolledAlert>,
				isPresent:1,
				srNo : 0
			});
			setTimeout(()=>{
				document.getElementById("submit").innerHTML = "Add";
				document.getElementById("new-todo").value = "";
				
				this.setState({
					message:"",
					srNo : 0,
				})
			}, 1000)
			break;
		}
		this.setState({
			isPresent : 0,
		},
		()=> {
			if(this.state.isPresent === 0)
			{
				axios.post("http://172.27.233.165:5452/api/Admin/AddSubCategory", subCategory,{
				headers: {
					"Authorization" : sessionStorage.getItem('userID')
				}
			})
			.then(response =>{
				this.setState({
					isLoaded : true,
					srNo : 0,
					message : <UncontrolledAlert>Added Sub Category!</UncontrolledAlert>
				})
				console.log(this.state.isLoaded);
				if(this.state.isLoaded)
				{
					document.getElementById("submit").innerHTML = "Add";
					document.getElementById("new-todo").value = "";
				}
				setTimeout(()=>{
					this.setState({
						message:"",
						srNo : 0,
					})
				}, 1000)
				
				this.updateInputValue();
				
			});
		}
	})
}
}


render()
{
	var {isLoaded, Categories,subCategoriesLoaded,subCategories} = this.state;
	if(!subCategoriesLoaded)
	{
		if(!isLoaded){
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
			return(
				<Container>
				<h3>Category List</h3>
				{/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}
				
				{/* <select  id="cat"  onChange={this.updateInputValue}>
				<option >select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} </select>
				*/}
				<FormGroup row>
				<Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="cat" onChange={this.updateInputValue}>
				<option >Select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} 
					</Input>
					</Col>
					</FormGroup>
					
					</Container>
					
					);
					
				}
			}
		else
	{
				return(
					<Container>
					
					<h3>Category List</h3>
					{/* <select  id="cat"  onChange={this.updateInputValue}>
					<option >select</option>
					{Categories.map(item =>(
						<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} </select> */}
					
					<FormGroup row>
					<Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
					<Col sm={6} >
					<Input type="select" id="cat" onChange={this.updateInputValue}>
					<option >select</option>
					{Categories.map(item =>(
						<option key={item.categoryID} value={item.categoryID} >{item.categoryName}</option>
						))} 
						</Input>
						</Col>
						</FormGroup>
						
						<h3>SubCategory List</h3>
						<Table striped className="text-center">
						<thead>
						<tr>
						<th>Serial Number</th>
						<th>SubCategory Name</th>  
						</tr>
						</thead>
						{subCategories.map(item =>(
							<tbody>
							<tr key={item.subcategoryID}>
							<td>{this.state.srNo =  this.state.srNo+1}</td>
							<td>{item.subcategoryName}</td>
							
							</tr>
							</tbody>
							
							))}
							</Table>
							
							{/* <Form onSubmit={this.handleSubmit}>
							<Input id="new-todo"   onChange={this.handleChange}   />
							<Button> Add New Sub-Category</Button>
						</Form> */}
						
						<Form id="form" onSubmit={this.handleSubmit}>
						
						<FormGroup>
						<Input 
						id="new-todo" 
						valid={ this.state.validate.subCategoryState === 'has-success' } 
						invalid={ this.state.validate.subCategoryState === 'has-danger' }  
						onChange={this.handleChange} 
						name="text" 
						required
						/>
						</FormGroup>
						<FormGroup>
						<Button id="submit"> Add </Button>
						<br/><br/>
						{this.state.message}
						</FormGroup>
						
						</Form>
						</Container>
						);
				}
					
					
					
				}
				
			}