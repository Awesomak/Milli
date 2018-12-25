import React, { Component } from 'react';
import AddQuestion from './AddQuestion'
import './customers.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  delete = (id) => {
    fetch('/api/delete/'+id, {
      method: 'delete'
    })
    .then(console.log("deleted"));
  }

  edit = (id,e) => {
    fetch("/api/question/"+id, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hard: document.getElementById("hard").value,
        quest: document.getElementById("quest").value,
        answer1: document.getElementById("answer1").value,
        answer2: document.getElementById("answer2").value,
        answer3: document.getElementById("answer3").value,
        answer4: document.getElementById("answer4").value,
        right: document.getElementById("right").value
    })
    })
  }

  componentDidMount() {
    fetch('/api/question')
      .then(res => res.json())
      .then(questions => this.setState({questions: questions}, () => console.log('Customers fetched...', questions)));
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        <button onClick={ this.props.toStart }>На главную</button>
        <table>
          <tbody>
            {this.state.questions ? this.state.questions.map(question => 
              <tr key={question._id}>
              <td>{question.hard}</td><td>{question.question}</td><td>{question.answers.answer1}</td><td>{question.answers.answer2}</td><td>{question.answers.answer3}</td><td>{question.answers.answer4}</td><td>{question.right}</td><td><button onClick={ this.edit.bind(this, question._id) }>edit</button></td><td><button onClick={ this.delete.bind(this, question._id) }>delete</button></td>
              </tr>
            ): "Not yet"}
          </tbody>
        </table>
        <AddQuestion />
      </div>
    );
  }
}

export default Questions;
