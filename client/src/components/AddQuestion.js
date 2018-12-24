import React, { Component } from 'react';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  sub = (e) => {
    e.preventDefault();
    fetch("/api/question", {
      method: 'post',
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


  render() {
    return (
      <form name="questionForm" onSubmit={ this.sub }>
        <label htmlFor="hard">Hard</label>
        <select name="hard" id="hard">
          <option value="1">Начальный</option>
          <option value="2">Средний</option>
          <option value="3">Сложный</option>
        </select><br />
        <label htmlFor="quest">quest</label>
        <input id="quest" name="quest" /><br />
        <label htmlFor="answer1">answer1</label>
        <input id="answer1" name="answer1" /><br />
        <label htmlFor="answer2">answer2</label>
        <input id="answer2" name="answer2" /><br />
        <label htmlFor="answer3">answer3</label>
        <input id="answer3" name="answer3" /><br />
        <label htmlFor="answer4">answer4</label>
        <input id="answer4" name="answer4" /><br />
        <label htmlFor="right">right</label>
        <input id="right" name="right" /><br />
        <button type="submit">go</button>
      </form>
    );
  }
}

export default AddQuestion;
