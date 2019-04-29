import React, { Component } from 'react';
import { Container, Col, Form, UncontrolledAlert, FormGroup, Label, Input, Row, CardBody, CardFooter, CardTitle, CardText, Button, Card, CardSubtitle, Badge} from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class Index extends Component{
    constructor()
    {
        super();
        this.state ={userTestAnswer:null,
             totalQuestions:0,   
             timer:{min:0, sec:0},
             testID:0,
             isSubmit:false,
             feedback:""
        }

    }

    timer(duration)
    {
        duration = Number(duration); 
    }

    componentWillMount()
    {
        this.setState({
            totalQuestions: this.props.location.state.totalQuestions,
            testID: this.props.location.state.userTestID,
        })
        this.GetQuestion(1,this.props.location.state.userTestID,1);
        // this.setState({
        //     totalQuestions: 30,
        //     userTestAnswer:{
        //         utid:3,
        //         sr: 3,
        //         question:{
        //             qt:"UQestion",
        //             o1:"asdfg",
        //             o2: "bsdfg",
        //             o3:"csdg",
        //             o4:"ddfh",
        //             m:4,
        //             topic:{
        //                 name:"t1",
        //             },
        //         }
        //     }
        // });
        console.log(this.state.userTestAnswer);
    }

    GetQuestion(id, testID, currentID)
    {

        axios.get("http://172.27.233.165:5452/api/test?id="+ id + "&utID=" + testID+ "&currentQues=" + currentID,{
          headers: {
            "Authorization" : sessionStorage.getItem('userID')
          }
        })
      .then(response => {  
        this.setState({
            userTestAnswer:response.data,
            feedback:""
        }, 
        () => {
          for(var i=0;i<4;i++){
            document.getElementsByName('options')[i].checked = false;
          }
          let options=document.getElementsByName("options");
      let ans=-1;
      switch (this.state.userTestAnswer.answerMarked) {
        case 'a':
          ans=0;
          break;
        case 'b':
          ans=1;
          break;
        case 'c':
          ans=2;
          break;
        case 'd':
          ans=3;
          break;
        default:
          break;
      }

      for (let index = 0; index < options.length; index++) {
        if (index===ans) {
          options[index].checked=true;
        }
      }
        });
      })
      .catch(error => {
        console.log(error);
      })
      console.log(this.state.userTestAnswer);
      
        
    }

    markAnswer(ans){
        axios.get("http://172.27.233.165:5452/api/test/mark?serialno="+this.state.userTestAnswer.srno+"&utestID="+this.state.testID+"&answer="+ans,{
          headers: {
            "Authorization" : sessionStorage.getItem('userID')
          }
        })
        .then(response => {
          console.log(response);
          //show feedback
          this.setState({
            feedback:<UncontrolledAlert>Answer Saved!</UncontrolledAlert>
          })

          setTimeout(()=>{
            this.setState({
              feedback:""
            })
          }, 1500)
        })
        .catch(error => {
          console.log(error.response);
          console.log(error);
        })
    }

    SubmitTest =()=>{
      axios.get("http://172.27.233.165:5452/api/user/puttestlog?id="+this.state.testID,{
        headers: {
          "Authorization" : sessionStorage.getItem('userID')
        }
      })
        .then(response => {
          if(response.statusText === "OK"){
            console.log("displayed");
            this.setState({
              isSubmit: true,
            })
          }
        })
        .catch(error => {
          console.log(error.response);
          console.log(error);
        })
      
    }

    componentDidMount(){
      console.log(this.props.location.state.duration);
      var dur = this.props.location.state.duration;
      var splitArray = dur.split(':');
      if(parseInt(splitArray[0])  === 0){
        dur = parseInt(splitArray[1]);
      }
      else{
        dur = parseInt(splitArray[0]) * 60 + parseInt(splitArray[1]);
      }
      console.log(dur);
        localStorage.duration=dur * 60;
        let time= setInterval(()=>{
            let duration = parseInt(localStorage.duration);
            var min,sec;
            min = parseInt(duration/60);
            sec = duration%60;
            localStorage.duration=duration-1;
            this.setState({timer:{min: min, sec: sec }});
            if (duration<=0) {
              this.SubmitTest();
              clearInterval(time);
            }
          },1000);
    }

    componentDidUpdate(){
      this.checkedMatch.bind(this);     
    }

    checkedMatch(){  
      let options=document.getElementsByName("options");
      let ans=-1;
      switch (this.state.userTestAnswer.answerMarked) {
        case 'a':
          ans=0;
          break;
        case 'b':
          ans=1;
          break;
        case 'c':
          ans=2;
          break;
        case 'd':
          ans=3;
          break;
        default:
          break;
      }

      for (let index = 0; index < options.length; index++) {
        if (index===ans) {
          options[index].checked=true;
        }
      }
    }

    render(){
        //let this.state.userTestAnswer = this.state.userTestAnswer;
        let allQuestions=[];
        for (let i = 1; i <= this.state.totalQuestions; i++) {
            allQuestions.push(<Col className="col-md-4 px-1 my-2" key={i}>
                <Button onClick={()=> this.GetQuestion(i,this.state.testID,this.state.userTestAnswer.srno)}>{i}</Button>
            </Col>);
        }
        if(this.state.isSubmit){
          return(
              <Redirect to={{pathname: '/result', state:{userTestID: this.state.testID},}}  />  
          )
        }
        else if (this.state.userTestAnswer !==null) {
          return(           
            <Container className="mt-2">
              {this.state.timer.sec<1 && this.state.timer.min===0 && <div>TIme ended submit test</div>}
              <Row className="QuestionsArea">
                <Col md="2">
                  <Row>
                    {allQuestions}
                  </Row>
                </Col>
                <Col className="Question" md="10">
                  <Card>
                    <CardBody>
                      <CardTitle className="text-center">
                        {this.state.userTestAnswer.question.topic.topicName}
                        <Badge color="primary" className="float-right">
                          Time Left: {this.state.timer.min+'m : '+this.state.timer.sec+'s'}
                        </Badge>
                      </CardTitle>
                      <CardSubtitle>
                        <Badge color="secondary" className="float-right">
                          Marks: {this.state.userTestAnswer.question.marks}
                        </Badge>
                      </CardSubtitle>
                      <CardText>
                        {this.state.userTestAnswer.srno}.{"  "} {this.state.userTestAnswer.question.questionText}
                      </CardText>     
                    </CardBody>
                    <CardFooter>
                      <Container>
                      {this.state.userTestAnswer.question.option1 && <FormGroup>
                            <Label for="exampleOptions"> 
                              <Input type="radio" name="options" onClick={()=>this.markAnswer("a")} defaultChecked={ this.state.userTestAnswer.answerMarked==="a"}/>{" "}{this.state.userTestAnswer.question.option1}
                            </Label>
                          </FormGroup>
                      }
                      {this.state.userTestAnswer.question.option2 && <FormGroup>
                            <Label for="exampleOptions"> 
                              <Input type="radio" name="options" onClick={()=>this.markAnswer("b")} defaultChecked={ this.state.userTestAnswer.answerMarked==="b"}/>{" "}{this.state.userTestAnswer.question.option2}
                            </Label>
                          </FormGroup>
                      }
                      {this.state.userTestAnswer.question.option3 && <FormGroup>
                            <Label for="exampleOptions"> 
                              <Input type="radio" name="options" onClick={()=>this.markAnswer("c")} defaultChecked={ this.state.userTestAnswer.answerMarked==="c"}/>{" "}{this.state.userTestAnswer.question.option3}
                            </Label>
                          </FormGroup>
                      }
                      {this.state.userTestAnswer.question.option4 && <FormGroup>
                            <Label for="exampleOptions"> 
                              <Input type="radio" name="options" onClick={()=>this.markAnswer("d")} defaultChecked={ this.state.userTestAnswer.answerMarked==="d"}/>{" "}{this.state.userTestAnswer.question.option4}
                            </Label>
                          </FormGroup>
                      }
                      { (this.state.userTestAnswer.srno!==1) &&<Button onClick={()=> this.GetQuestion(this.state.userTestAnswer.srno-1,this.state.testID,this.state.userTestAnswer.srno)}>Previous</Button>}
                      { (this.state.userTestAnswer.srno!==this.state.totalQuestions) &&<Button className="mx-3" onClick={()=> this.GetQuestion(this.state.userTestAnswer.srno+1,this.state.testID,this.state.userTestAnswer.srno)}>Next</Button>}
                      <Button className="float-right" onClick={()=>this.SubmitTest()}>Submit</Button>
                      </Container>
                      <br/>
                      {this.state.feedback}
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
        )
        }
        else{
            return(
                <div>Loading Questuions</div>
            )
        }
    }
}