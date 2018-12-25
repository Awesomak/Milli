import React, { Component } from 'react';
import Time from '../components/Time'
import Question from '../components/Question'
import Answer from '../components/Answer'

class QuestionPage extends Component {
    state = {
        question: 0,
        time: 60,
        questions: null,
        done: false,
        quest: null,
        answersrand: [],
        right: null
    }

    next = (val) => {
        const question = this.state.question;
        if(val === true) {
            this.setState({
                question: question + 1,
                time: 60
            })
        } else {
            clearInterval(this.timer);
            this.props.toResult(this.state.question);
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            if(this.state.time === 0 || this.state.question === 10) {
                clearInterval(this.timer);
            } else {
            const { time } = this.state
            this.setState({
                time: time - 1
            })
            }
        }, 1000);
    }

    componentWillMount() {
        this.startTimer();
        fetch('/api/questions')
        .then(res => res.json())
        .then(questions => this.setState({questions: questions, done: true}, () => { console.log('Customers fetched...', questions); this.update()}))
    }

    update = () => {
        function rand(a,b) {
            return Math.random() - 0.5;
        }
        var a = [ this.state.questions[this.state.question].answers.answer1,
                                this.state.questions[this.state.question].answers.answer2,
                                this.state.questions[this.state.question].answers.answer3,
                                this.state.questions[this.state.question].answers.answer4,]
        a.sort(rand);
        this.setState({
            quest: this.state.questions[this.state.question].question,
            right: this.state.questions[this.state.question].right,
            answersrand: a
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.question !== this.state.question) {
            this.state.question === 10 ? this.props.toResult(this.state.question) : this.update()
        }
    }

    render() {
        if(this.state.done) {
            return (
                <React.Fragment>
                    <Time time={this.state.time}></Time>
                    <Question question={ this.state.quest }></Question>
                    <Answer next={this.next} answer={ this.state.answersrand[0] } rig={ this.state.right }></Answer>
                    <Answer next={this.next} answer={ this.state.answersrand[1] } rig={ this.state.right }></Answer><br />
                    <Answer next={this.next} answer={ this.state.answersrand[2] } rig={ this.state.right }></Answer>
                    <Answer next={this.next} answer={ this.state.answersrand[3] } rig={ this.state.right }></Answer><br />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                </React.Fragment>
            );
        }
    }
  }
  
export default QuestionPage;