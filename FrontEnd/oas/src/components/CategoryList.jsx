import React, { Component } from 'react';
import { Container, Col,Table, Form, FormGroup, Alert, UncontrolledAlert, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card} from 'reactstrap';
import axios from 'axios';

class CategoryList extends Component{
	constructor(props)
	{
		super(props);
		//this.toggle=this.toggle.bind(this);
		this.state ={categories :[],
			srNo:0,
			text : '',
			isLoaded : false,
			message : "",
			isPresent : 1,
			validate : {
				categoryState:""
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	validateCategory = (e) => {
		let pattern = /^[a-zA-Z]+$/;
		if(pattern.test(e.target.value)){
			this.setState({
				validate:{categoryState:'has-success'}
			})
			document.getElementById("submit").disabled = false;
		}
		else{
			this.setState({
				validate:{categoryState:'has-danger'}
			})
			document.getElementById("submit").disabled = true;
		}
	}
	
	AddNewCategory()
	{
		let category = {
			categoryName:this.state.categoryName,
			created_by: sessionStorage.getItem('username')
		}
		//Call approppriate api here
		axios.post("http://172.27.233.165:5452/api/User/Registe", category)
	}
	
	componentDidMount()
	{
		axios.get('http://172.27.233.165:5452/api/Admin/category', {
			headers: {
				"Authorization" : sessionStorage.getItem('userID')
			}
		})
		.then(response=>{
			this.setState({
				isLoaded:true,
				categories:response.data,
				srNo:0,
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
	
	render()
	{
		var {isLoaded, categories} = this.state;
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
				<Table striped className="text-center">
					<thead>
						<tr>
							<th>Serial Number</th>
							<th>Category Name</th>
							{/* <th>Created By</th>
							<th>Modified by</th> */}
						</tr>
					</thead>
					{categories.map(item =>(
						<tbody key={item.categoryID}>
							<tr>
								<td>{this.state.srNo =  this.state.srNo+1}</td>
								<td>{item.categoryName}</td>
								{/* <td>{item.created_by}</td>
								<td>{item.modified_by}</td> */}
							</tr>
						</tbody>
						))}
					</Table>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<Input id="new-todo" 
							valid={ this.state.validate.categoryState === 'has-success' } 
							invalid={ this.state.validate.categoryState === 'has-danger' }  
							onChange={this.handleChange} 
							name="text" 
							value={this.state.text} 
							required
							/>
						</FormGroup>
						<FormGroup>
							<Button id="submit"> Add </Button>
							
						</FormGroup>
						<FormGroup>
							{this.state.message}
						</FormGroup>
						{/* <FormGroup row>
							<Input 
							sm={{size:4, offset: 1}}
							id="new-todo" 
							valid={ this.state.validate.categoryState === 'has-success' } 
							invalid={ this.state.validate.categoryState === 'has-danger' }  
							onChange={this.handleChange} 
							name="text" 
							value={this.state.text} 
							required
							/>
							<Col sm={6}>
								<Button id="submit"> Add </Button>
							</Col>
						</FormGroup> */}
					</Form>
				</Container>
				);
			}
			
		}
		handleChange(e) {
			this.setState({ text: e.target.value,
				srNo:0, });
			if(e.target.name === "text")
			this.validateCategory(e);
		}
		
		handleSubmit(e) {
			e.preventDefault();
			
			if (!this.state.text.length) {
				return;
			}
			let category = {
				categoryName:this.state.text,
				is_Active:true
			}
			
			console.log(category);
			document.getElementById("submit").innerHTML = "Loading.."
			
			for(let i=0; i<this.state.categories.length; i++)
			{
				console.log(this.state.categories[i].categoryName.toLocaleLowerCase());
				if(this.state.categories[i].categoryName.toLocaleLowerCase() === category.categoryName.toLocaleLowerCase())
				{
					console.log("inside the loop");
					this.setState({
						message: <UncontrolledAlert>Category Already present!</UncontrolledAlert>,
						isPresent : 1
					},()=>{
						setTimeout(()=>{
							window.location.reload();
						}, 1000)
					});
					break;
				}
				this.setState({
					isPresent : 0,
				},
				()=> {
					console.log(this.state.isPresent);
					if(this.state.isPresent === 0)
					{
						axios.post("http://172.27.233.165:5452/api/Admin/AddCategory", category, {
							headers: {
								"Authorization" : sessionStorage.getItem('userID')
							}
						})
						.then(response =>{
							this.setState({
								isLoaded : true,
								message : <UncontrolledAlert>Added Category!</UncontrolledAlert>
							})
							console.log(this.state.message);
							setTimeout(()=>{
								window.location.reload();
							}, 1000)
						});
					}
				})
			}
			
			//console.log(this.state.isPresent);
			
			// if(this.state.isLoading){
				//     document.getElementById("submit").innerHTML = "Loading.."
				//     window.location.reload();
				// }
				console.log(this.state.categories);
			}
		}
		
		
		export default  CategoryList;