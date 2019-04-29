import React, {Component} from 'react';
import { Table, UncontrolledAlert } from 'reactstrap';
import axios from 'axios';

export default class TestLog extends Component{
	constructor(props){
		super(props);
		this.state={
			logs:[],
			isLoaded:false,
			message:"",
			sample : "",
			sample01 : [],
		}
	}
	
	componentDidMount(){
		if (sessionStorage.getItem('userID')) {
			axios.get('http://mayureshka:5452/api/user/testlogdata?id='+sessionStorage.getItem('userID'),{
				headers: {
				  "Authorization" : sessionStorage.getItem('userID')
				}
			  })
			.then(res=>{
				this.setState({
					isLoaded:true,
					logs:res.data,
					//sample:res.data[0].testLogs[0].testStarted,
				})
			})
			.catch(error=>{
				this.setState({
					isLoaded:true,
					message: <UncontrolledAlert>Please Try Again!</UncontrolledAlert>
				})
				console.log(error);
			});
		}
		else{
			this.setState({
				message: <UncontrolledAlert>Please Log In to View this page!</UncontrolledAlert>,
				isLoaded:true
			})
		}
		let s = this.state.sample.split("T");
		this.state.sample01 = new Date(Date.UTC(this.state.sample));
		
	}
	
	func=()=>
	{
		

	}
	render(){
		var {isLoaded, logs} = this.state;
		console.log(logs);
		console.log(this.state.sample01);
		if(!isLoaded){
			return <div>Loading...</div>;
		}
		else{
			if (this.state.message!=="") {
				return this.state.message
			} else {
				return(
					<Table striped className="text-center">
					<thead>
					<tr>
					<th>Date</th>
					<th>Time Started</th>
					<th>Test Name</th>
					<th>Marks Scored</th>
					<th>Out Off</th>
					<th>Passing Marks</th>
					<th>Status</th>
					</tr>
					</thead>
					{logs.map(log =>(
					<tbody key={log.testLogID}>
						<tr>
						<td>
							{(log.testLogs[0].testStarted).split("T")[0].split("-")[2]}-
							{(log.testLogs[0].testStarted).split("T")[0].split("-")[1]}-
							{(log.testLogs[0].testStarted).split("T")[0].split("-")[0]}
						</td>
						<td>
							{((log.testLogs[0].testStarted).split("T")[1].split(":")[0])}:
							{(log.testLogs[0].testStarted).split("T")[1].split(":")[1]}
						</td>
						<td>{log.test.subcategory.subcategoryName}</td>
						<td>{log.marksScored}</td>
						<td>{log.test.totalMarks}</td>
						<td>{log.test.passingMarks}</td>
						<td>{log.statusOfTest}</td>
						</tr>
						
					</tbody>
					))}
						</Table>
						);
					}
				}
				
				
			}
			
		}
		
