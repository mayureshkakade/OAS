import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Container, Col, Form, FormGroup, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card, CardSubtitle, Badge} from 'reactstrap';

export default class Report extends Component{
    constructor()
    {
        super();
        this.state={
            categories:[],
            chartData: {},
            reportsList:[],
            statea: [],
            statex:[],
            statey:[],
            statez:[],
        }
    }

    convertToPdf(){
        const pdf = new jsPDF();
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("Report.pdf");
        });
    }

    componentWillMount(){
        // console.log(this.state.userid);
		if (sessionStorage.getItem('userID')) {
            fetch('http://172.27.233.165:5452/api/user',{
                
            })
            .then(res=>res.json())
            .then(json=>{
                let categoryList=[];
                if (json.length) {
                    this.setState({
                        isLoaded:true,
                        categories:json,
                    })    
                }
                else{
                    categoryList.push(json);
                    this.setState({
                        isLoaded:true,
                        categories:categoryList,
                    })
                }
                
            });
            fetch("http://mayureshka:5452/api/user/reports/?userID="+sessionStorage.getItem("userID")+"&categoryID=2")
			// fetch("http://mayureshka:5452/api/user/reports/?userID="+this.state.userid+"&categoryID="+this.state.categoryID)
			.then(res=>res.json())
			.then(json=>{
				this.setState({
					isLoaded:true,
                    reportsList:json,
                    statex : json[0],
                    statey : json[2],
                    statez : json[3]
                })
                console.log(this.state.statex);
                console.log(this.state.reportsList);

            });
			
        }
        // this.setState({reportsList : 
        // {[
        //     {TotalMarks  : 100, Marks : 50, Name : 'subCat1' },
        //     {TotalMarks  : 100, Marks : 75, Name : 'subCat2' },
        //     {TotalMarks  : 100, Marks : 25, Name : 'subCat3' },
        // ]
        // [
        //     {TotalMarks  : 100, Marks : 70, Name : 'Cat1' },
        //     {TotalMarks  : 100, Marks : 80, Name : 'Cat2' },
        //     {TotalMarks  : 100, Marks : 90, Name : 'Cat3' },
        // ]
        // [
        //     {TotalMarks  : 100, Marks : 10, Name : 'top1' },
        //     {TotalMarks  : 100, Marks : 20, Name : 'top2' },
        //     {TotalMarks  : 100, Marks : 30, Name : 'top3' },
        // ]}
        // })

        // this.setState({statex : [
        //     {TotalMarks  : 100, Marks : 70, Name : 'Cat1' },
        //     {TotalMarks  : 100, Marks : 80, Name : 'Cat2' },
        //     {TotalMarks  : 100, Marks : 90, Name : 'Cat3' },
        // ]
        // })

        // this.setState({statey : [
        //     {TotalMarks  : 100, Marks : 50, Name : 'subCat1' },
        //     {TotalMarks  : 100, Marks : 75, Name : 'subCat2' },
        //     {TotalMarks  : 100, Marks : 25, Name : 'subCat3' }
        // ]
        // })
        // this.setState({statez : [
        //     {TotalMarks  : 100, Marks : 10, Name : 'top1' },
        //     {TotalMarks  : 100, Marks : 20, Name : 'top2' },
        //     {TotalMarks  : 100, Marks : 30, Name : 'top3' },
        // ]
        // })
            
            
		// }
		// else{
		// 	this.setState({
		// 		message: <UncontrolledAlert>Please Log In to View this page!</UncontrolledAlert>
		// 	})
		// }
		// fetch('http://localhost:60676/api/testlogs/1')
		
    }
    getCategoryID=(event)=>{
        var categoryID = document.getElementById('exampleSelect').value;
        console.log(categoryID);
        fetch("http://mayureshka:5452/api/user/reports/?userID="+sessionStorage.getItem("userID")+"&categoryID="+categoryID)
			// fetch("http://mayureshka:5452/api/user/reports/?userID="+this.state.userid+"&categoryID="+this.state.categoryID)
			.then(res=>res.json())
			.then(json=>{
				this.setState({
					isLoaded:true,
                    reportsList:json,
                    statea: json[1],
                    statex : json[0],
                    statey : json[2],
                    statez : json[3],
                })
                console.log(this.state.statex);
                console.log(this.state.statey);
                console.log(this.state.statez);
                console.log(this.state.reportsList);

            });
    }
    render() {
        var labelx = [];
        var datax = [];
        this.state.statex.map(item => {
            labelx.push(item.Name);
            datax.push(item.Marks);
        })

        var labela = [];
        var dataa = [];
        this.state.statea.map(item => {
            labela.push(item.Name);
            dataa.push(item.Marks);
        })

        var labely = [];
        var datay = [];
        this.state.statey.map(item => {
            labely.push(item.Name);
            datay.push(item.Marks);
        })
        var labelz = [];
        var dataz = [];
        this.state.statez.map(item => {
            labelz.push(item.Name);
            dataz.push(item.Marks);
        })
        // let data = {
        //     labels: ["Red", "Blue","Green"],
        //     datasets: [
        //         {
        //         label: ['Score'],
        //         data: [90,60,40],
        //         // backgroundColor: [
        //         //     'rgba(255, 99, 132, 1)',
        //         //     'rgba(54, 162, 235, 1)',
                   
        //         //     ],
        //         // borderColor: [
        //         //     'rgba(255,99,132,1)',
        //         //     'rgba(54, 162, 235, 1)',
                    
        //         //     ],
        //         borderWidth: 1
        //         },
                
        //         {
        //             label: ['Color'],
        //             data: [40,40,40],
        //             backgroundColor: 
        //                 'rgba(255, 99, 132, 1)',
        //             //     'rgba(54, 162, 235, 1)',
                       
        //             //     ],
        //             // borderColor: [
        //             //     'rgba(255,99,132,1)',
        //             //     'rgba(54, 162, 235, 1)',
                        
        //             //     ],
        //             borderWidth: 1
        //         }
        //     ]
        // };

        // let op={
        //     width: 30,
        //     height: 20,
        //     maintainAspectRatio: true,
        //     scales: {
        //         xAxes: [{
        //             gridLines:{
        //                 display: false,
        //             },

        //             ticks: {
        //                 min:0,
        //                 max:100,
                        
        //             }
        //             },
        //             {
        //             id: 'B',
        //             position: "top",
        //             type: 'category',
                    
        //             labels: ['','','Satisfactory', 'Good', 'Excellent',""],
        //             labelOffset: 20,
        //             autoSkipPadding:30,
        //             }
        //         ]
        //     }
        // };

        
        let catData={
            
            data:{
            labels: labelx,
            datasets: [{
                label: ['Score'],
                data:datax,// datax,
                backgroundColor:
                'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
                {
                    label: ['Overall Score'],
                    data: dataa,
                    backgroundColor:
                    'rgb(192,192,192)',
                    borderWidth: 1
                    },
            ]
            },
            options:{
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    gridLines:{
                        display: false,
                    },

                    ticks: {
                        min:0,
                        max:100,
                        
                    }
                },
                {
                    id: 'B',
                    position: "top",
                    type: 'category',
                    
                    labels: ['','','Satisfactory', 'Good', 'Excellent',""],
                    labelOffset: 20,
                    autoSkipPadding:30,
                }
                ]
                }
            },
        }

        let subData={
            
            data:{
            labels: labely,
            datasets: [{
                label: ['Score'],
                data: datay,
                backgroundColor:
                'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
            ]
            },
            options:{
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    gridLines:{
                        display: false,
                    },

                    ticks: {
                        min:0,
                        max:100,
                        
                    }
                },
                {
                    id: 'B',
                    position: "top",
                    type: 'category',
                    
                    labels: ['','','Satisfactory', 'Good', 'Excellent',""],
                    labelOffset: 20,
                    autoSkipPadding:30,
                }
                ]
                }
            },
        }

        let topicData={
            
            data:{
            labels: labelz,
            datasets: [{
                label: ['Score'],
                data: dataz,
                backgroundColor:
                'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
            ]
            },
            options:{
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    gridLines:{
                        display: false,
                    },

                    ticks: {
                        min:0,
                        max:100,
                        
                    }
                },
                {
                    id: 'B',
                    position: "top",
                    type: 'category',
                    
                    labels: ['','','Satisfactory', 'Good', 'Excellent',""],
                    labelOffset: 20,
                    autoSkipPadding:30,
                }
                ]
                }
            },
        }
        console.log(this.state.categories)
       return (

        
       <div>
           <h3 className="text-center">Filter Reports</h3>
           <hr/>
           <FormGroup row>
          <Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
          <Col sm={6} >
            <Input type="select" name="subcategory" id="exampleSelect" onChange = {this.getCategoryID} required>
            <option required>Select</option>
            {this.state.categories.map(item =>(
              <option  key={item.categoryID} value={item.categoryID}>{item.categoryName}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <hr/>
        <div className="col-lg-6 col-md-8" id="divToPrint">
            <h3 className="text-center">Category Wise Report</h3>
            <hr/>
            <HorizontalBar 
            data={catData.data}
            options={catData.options }
            onRef = {ref => this.chart = ref}
            />
            <hr/>
            <h3 className="text-center">Sub-category Wise Report</h3>
            <hr/>
            <HorizontalBar 
            data={subData.data}
            options={subData.options }
            onRef = {ref => this.chart = ref}
            />
            <hr/>
            <h3 className="text-center">Topic Wise Report</h3>
            <hr/>
            <HorizontalBar 
            data={topicData.data}
            options={topicData.options }
            onRef = {ref => this.chart = ref}
            />
        </div>
        <hr/>
        <Button className="mx-5" color="primary" onClick={()=>this.convertToPdf()}>Download</Button>
        
    </div>
    
        

        );
      }
}
