import React, { Component } from 'react';
import StartPage from './pages/StartPage'
import QuestionPage from './pages/QuestionPage'
import RecordPage from './pages/RecordPage'
import ResultPage from './pages/ResultPage'
import './App.css';

class App extends Component {
  state = {
    page: 1,
    q: 0
  }

  toQuest = () => {
    this.setState({
      page: 2
    })
  }

  toResult = (val) => {
    this.setState({
      page: 3,
      q: val
    })
  }

  toStart = () => {
    this.setState({
      page: 1
    })
  }

  toRecord = () => {
    this.setState({
      page: 4
    })
  }

  render() {
    if(this.state.page === 1) {
      return (
        <StartPage toQuest={this.toQuest} toRecord={this.toRecord}></StartPage>
      );
    } else if (this.state.page === 2) {
      return (
        <QuestionPage toResult={this.toResult}></QuestionPage>
      );
    } else if (this.state.page === 3) {
      return (
        <ResultPage toStart={this.toStart} toRecord={this.toRecord} q={this.state.q}></ResultPage>
      );
    } else if (this.state.page === 4) {
      return (
        <RecordPage toStart={this.toStart}></RecordPage>
      );
    }
  }
}

export default App;
