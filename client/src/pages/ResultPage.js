import React, { Component } from 'react';

class ResultPage extends Component {

result = () => {
    fetch("/api/result", {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          result: this.props.q
      })
      })
    setTimeout(() => this.props.toStart(), 300)
}
    
render() {
    return (
    <React.Fragment>
        <p>Введите имя</p>
        <input placeholder='имя' id="name" />
        <p>Ваш результат - { this.props.q }</p>
        <button className="answer" onClick={ this.result }>Отправить</button>
    </React.Fragment>
    );
}
}
  
export default ResultPage;