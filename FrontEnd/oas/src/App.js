import React, { Component } from 'react';
import './App.css';
import ResultPopUp from './components/UserTestResult.jsx'
import TestLog from './components/UserTestLogs';
import Index from './components/user/Index';
import Question from './components/user/Question';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import UploadQuestionPaper from './components/UploadQuestionPaper'
import CategoryList from './components/CategoryList'
import FailedStudent from './components/admin/FailedStudents'
import Report from './components/user/Report';
import Subcategory from './components/SubCategory';
import questions from './components/questions';
import Home from './components/admin/Home';

import QuestionModal from './components/questionModal';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/user/index" component={Index}  />
        <Route path="/admin/uploadFile" component={UploadQuestionPaper}  />
        <Route path="/admin/getCategory" component={CategoryList}  />
        <Route exact path="/" component={Index}  />
        <Route path="/user/question" component={Question}  />
        <Route path="/admin/failed" component={FailedStudent} />
        <Route path="/result" component ={ResultPopUp}/>
        <Route path="/testlogs" component={TestLog} />
        <Route path="/reports" component={Report} />
        <Route path="/admin/subcategory" component={Subcategory} />
        <Route path="/admin/questions" component={questions}  />
        <Route path="/admin/home" component={Home}  />
      </Switch>
      </BrowserRouter>
      
     {/* <QuestionModal/> */}

      {/* 
      <TestLog/> */}
      {/* <UploadQuestionPaper/> */}
      {/* <ResultPopUp buttonLabel = "Submit"/> */}
      {/* <CategoryList/> */}
      </div>
      );
    }
  }
export default App;
