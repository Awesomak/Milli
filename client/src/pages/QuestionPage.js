import React, { Component } from 'react';
import Time from '../components/Time'
import Question from '../components/Question'
import Answer from '../components/Answer'
import Money from '../components/Money'
import Hall from '../components/Hall'

class QuestionPage extends Component {
    state = {
        question: 0,
        time: 60,
        questions: null,
        done: false,
        wait: true,
        extra: false,
        enabled: true,
        tips:[1,1,1,1],
        hall: null
    }

    next = (val) => {
        const question = this.state.question;
        if(val === true) {
            this.setState({
                question: question + 1,
                time: 63,
                wait: false
            })
        } else if (!this.state.extra) {
            fetch('/api/help/right/'+this.state.questions[question]._id, {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(r => {
                var targets = document.getElementsByClassName("answer");
                for (let i = 0; i < 4; i++) {
                    if (targets[i].innerHTML === r.right) {
                        targets[i].classList.add("right");
                    }
                }
            })
                clearInterval(this.timer);
                setTimeout(() => this.props.toResult(this.state.question),2000)
        }
        this.setState({
            extra: false
        })
    }

    rand = (a,b) => {
        return Math.random() - 0.5;
    }

    ft_ft = () => {
        fetch("/api/help/fifty", {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              answers: this.state.questions[this.state.question].answers,
              id: this.state.questions[this.state.question]._id
            })
        })
        .then(res => res.json())
        .then(ans => {
            var targets = document.getElementsByClassName("polygon");
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].firstChild.innerHTML === ans[0] || targets[i].firstChild.innerHTML === ans[1]) {
                    targets[i].style.display = "none";
                }
            }
        })
        var tips = this.state.tips;
        this.setState({
            tips: [0,tips[1],tips[2],tips[3]]
        })
    }

    right = () => {
        fetch('/api/help/right/'+this.state.questions[this.state.question]._id, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(r => {
            var targets = document.getElementsByClassName("answer");
            for (let i = 0; i < 4; i++) {
                if (targets[i].innerHTML === r.right) {
                    targets[i].classList.add("right");
                    setTimeout(() => {
                        this.next(true);
                    }, 2000);
                }
            }
        })
        var tips = this.state.tips;
        this.setState({
            tips: [tips[0],0,tips[2],tips[3]]
        })
    }

    two_try = () => {
        var tips = this.state.tips;
        this.setState({
            extra: true,
            tips: [tips[0],tips[1],0,tips[3]]
        })
    }

    assistance = () => {
        fetch('/api/help/assistance/'+this.state.questions[this.state.question]._id, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              answers: this.state.questions[this.state.question].answers,
              id: this.state.questions[this.state.question]._id
            })
        })
        .then(res => res.json())
        .then(resu => {
            this.setState({
                hall: resu
            })
        })
        var tips = this.state.tips;
        this.setState({
            tips: [tips[0],tips[1],tips[2],0]
        })
    }


    startTimer = () => {
        this.timer = setInterval(() => {
            if(this.state.time === 0 || this.state.question === 12) {
                clearInterval(this.timer);
                this.props.toResult(this.state.question);
            } else {
            const { time } = this.state
            this.setState({
                time: time - 1
            })
            }
        }, 1000);
    }

    disable = () => {
        var targets = document.getElementsByClassName("answer");
        for (let i = 0; i < 4; i++) {
            targets[i].disabled = true;
        }
    }

    continue_work = () => {
        this.setState({
            hall: null
        })
    }

    componentWillMount() {
        fetch('/api/questions')
        .then(res => res.json())
        .then(questions => this.setState({questions}, () => {
            questions.forEach(e => {
                e.answers.sort(this.rand);
            });
            this.setState({
                done: true,
                enabled: true
            })
            console.log('Customers fetched...', questions);
        }))
    }

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.question !== this.state.question) {
            if (this.state.question === 12) this.props.toResult(this.state.question)
            setTimeout(() => {
                this.setState({
                    wait: true
                })
            }, 3000);
        }

        var ready = document.getElementById("ft");
        if(ready) {
            var tips = this.state.tips;
            if (!tips[0]) {
                let used = document.getElementById("ft");
                used.disabled = true;
                used.classList.add("false");
            }
            if (!tips[1]) {
                let used = document.getElementById("right");
                used.disabled = true;
                used.classList.add("false");
            }
            if (!tips[2]) {
                let used = document.getElementById("extra");
                used.disabled = true;
                used.classList.add("false");
            }
            if (!tips[3]) {
                let used = document.getElementById("help");
                used.disabled = true;
                used.classList.add("false");
            }
        }
    }

    render() {
        if(this.state.done && this.state.wait) {
            const questions = this.state.questions[this.state.question]
            return (
                <React.Fragment>
                    <Time time={this.state.time}></Time>
                    <Question question={ questions.question }></Question>
                    <div className="answers">
                        <Answer ref={(an1) => {this.an1 = an1}} next={this.next} disable={ this.disable } answer={ questions.answers[0] } id={ questions._id }></Answer>
                        <Answer ref={(an2) => {this.an2 = an2}} next={this.next} disable={ this.disable } answer={ questions.answers[1] } id={ questions._id }></Answer>
                        <Answer ref={(an3) => {this.an3 = an3}} next={this.next} disable={ this.disable } answer={ questions.answers[2] } id={ questions._id }></Answer>
                        <Answer ref={(an4) => {this.an4 = an4}} next={this.next} disable={ this.disable } answer={ questions.answers[3] } id={ questions._id }></Answer>
                    </div>
                    <div className="pos_ab">
                        <button onClick={this.ft_ft} className="help_button" id="ft">50/50</button>
                        <button onClick={this.right} className="help_button" id="right">right</button>
                        <button onClick={this.two_try} className="help_button" id="extra">2x</button>
                        <button onClick={this.assistance} className="help_button" id="help">help</button>
                    </div>
                    {
                        this.state.hall !== null ? <Hall continue_work={ this.continue_work } a={this.state.hall[0]} b={this.state.hall[1]} c={this.state.hall[2]} d={this.state.hall[3]}/> : null
                    }
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