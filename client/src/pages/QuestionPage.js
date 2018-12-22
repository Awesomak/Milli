import React, { Component } from 'react';
import Time from '../components/Time'
import Question from '../components/Questiom'
import Answer from '../components/Answer'

class QuestionPage extends Component {
    state = {
        question: 0,
        time: 10,
        easy: null,
        mid: null,
        hard: null
    }

    next = (val) => {
        const question = this.state.question;
        if(val === true) {
            this.setState({
                question: question + 1,
                time: 10
            })
        } else {
            clearInterval(this.timer);
            console.log("loooose");
            
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            const { time } = this.state
            this.setState({
                time: time - 1
            })
            if(this.state.time === 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }
    
    componentWillMount() {
        this.startTimer();
    }

    componentDidMount() {
        fetch('/api/questions')
        .then(res => res.json())
        .then(questionseasy => this.setState({easy: questionseasy}, () => console.log('Customers fetched...', questionseasy)))
    }

    render() {
        if(this.state.question < 4 && this.state.easy) {
            var quest = this.state.easy[this.state.question].question;
            var answer1 = this.state.easy[this.state.question].answers.answer1;
            var answer2 = this.state.easy[this.state.question].answers.answer2;
            var answer3 = this.state.easy[this.state.question].answers.answer3;
            var answer4 = this.state.easy[this.state.question].answers.answer4;
            var right = this.state.easy[this.state.question].right;
        }
      return (
        <React.Fragment>
            <Time time={this.state.time}></Time>
            <Question question={ quest }></Question>
            <Answer next={this.next} answer={ answer1 } rig={ right }></Answer>
            <Answer next={this.next} answer={ answer2 } rig={ right }></Answer><br />
            <Answer next={this.next} answer={ answer3 } rig={ right }></Answer>
            <Answer next={this.next} answer={ answer4 } rig={ right }></Answer><br />
        </React.Fragment>
      );
    }
  }
  
export default QuestionPage;