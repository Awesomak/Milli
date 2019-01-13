import React, { Component } from 'react';
import Time from '../components/Time'
import Question from '../components/Question'
import Answer from '../components/Answer'
import Money from '../components/Money'

class QuestionPage extends Component {
    state = {
        question: 0,
        time: 60,
        questions: null,
        done: false,
        quest: null,
        answersrand: [],
        wait: true
    }

    next = (val) => {
        const question = this.state.question;
        if(val === true) {
            this.setState({
                question: question + 1,
                time: 63,
                wait: false
            })
        } else {
            clearInterval(this.timer);
            this.props.toResult(this.state.question);
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            if(this.state.time === 0 || this.state.question === 12) {
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
        fetch('/api/questions')
        .then(res => res.json())
        .then(questions => this.setState({questions, done: true}, () => { console.log('Customers fetched...', questions); this.update()}))
    }

    componentDidMount() {
        this.startTimer();
    }

    update = () => {
        function rand(a,b) {
            return Math.random() - 0.5;
        }

        var a = [   this.state.questions[this.state.question].answers.answer1,
                    this.state.questions[this.state.question].answers.answer2,
                    this.state.questions[this.state.question].answers.answer3,
                    this.state.questions[this.state.question].answers.answer4,]
        a.sort(rand);

        this.setState({
            quest: this.state.questions[this.state.question].question,
            answersrand: a
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.question !== this.state.question) {
            this.state.question === 12 ? this.props.toResult(this.state.question) : this.update()
            setTimeout(() => {
                this.setState({
                    wait: true
                })
            }, 3000);
        }
    }

    render() {
        if(this.state.done && this.state.wait) {
            return (
                <React.Fragment>
                    <Time time={this.state.time}></Time>
                    <Question question={ this.state.quest }></Question>
                    <div className="answers">
                        <div className="flex">
                            <Answer next={this.next} answer={ this.state.answersrand[0] } id={ this.state.questions[this.state.question]._id }></Answer>
                            <Answer next={this.next} answer={ this.state.answersrand[1] } id={ this.state.questions[this.state.question]._id }></Answer>
                        </div>
                        <div className="flex">
                            <Answer next={this.next} answer={ this.state.answersrand[2] } id={ this.state.questions[this.state.question]._id }></Answer>
                            <Answer next={this.next} answer={ this.state.answersrand[3] } id={ this.state.questions[this.state.question]._id }></Answer>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <Money quest={ 12-this.state.question } />
            );
        }
    }
  }
  
export default QuestionPage;