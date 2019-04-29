import React from 'react';
import {Col, FormGroup, Label} from 'reactstrap';

export default class ResultDisplay extends React.Component {
   constructor(props){
        super(props);
        this.state={
            testLogsData:[],
            isLoaded:false
        }
    }

    toggle(){
        this.setState({
            modal: !this.state.isLoaded
        });
    }
    componentDidMount(){
        fetch('http://172.27.233.165:5452/api/user/result/?id='+this.props.userTestID,{
            headers: {
              "Authorization" : sessionStorage.getItem('userID')
            }
          })
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                isLoaded:true,
                testLogsData:json,
            })
        });
    }

    render(){
        var {isLoaded, testLogsData} = this.state;
        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else{
            return(
                
                <div>
                    <Col sm={12}>
                    <FormGroup row>
                        <Label sm={{size:4, offset:2}}>Test name:</Label>
                        <Col sm={6}>
                            <Label for="totalMarks" sm={4}>{testLogsData.test.subcategory.subcategoryName}</Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{size:4, offset:2}}>Marks:</Label>
                        <Col sm={6}>
                            <Label for="totalMarks" sm={4}>{testLogsData.marksScored}</Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{size:4, offset:2}}>Total Marks:</Label>
                        <Col sm={6}>
                            <Label for="totalMarks" sm={4}>{testLogsData.test.totalMarks}</Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{size:4, offset:2}}>Passing Marks:</Label>
                        <Col sm={6}>
                            <Label for="totalMarks" sm={4}>{testLogsData.test.passingMarks}</Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={{size:4, offset:2}}>Status:</Label>
                        <Col sm={6}>
                            <Label for="statusOfTest" sm={4}>{testLogsData.statusOfTest}</Label>
                        </Col>
                    </FormGroup>
                    </Col>
                </div> 
            );
        }
        
    }
}