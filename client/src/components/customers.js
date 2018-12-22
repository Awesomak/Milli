import React, { Component } from 'react';
import AddQuestion from './AddQuestion'
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    fetch('/api/question')
      .then(res => res.json())
      .then(questions => this.setState({questions: questions}, () => console.log('Customers fetched...', questions)));
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
        {this.state.questions ? this.state.questions.map(question => 
          <li key={question._id}>{question.hard}{question.question}{question.answers.answer1}{question.answers.answer2}{question.answers.answer3}{question.answers.answer4}</li>
        ): "Not yet"}
        </ul>
        <AddQuestion />
      </div>
    );
  }
}

export default Customers;
