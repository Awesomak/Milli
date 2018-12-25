import React, { Component } from 'react';

class StartPage extends Component {

  delete = () => {
    fetch('/api/delete', {
      method: 'delete'
    })
    .then(console.log("deleted"));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Миллионер</h1>
        <button onClick={() => { this.props.toQuest()}}>Начать</button><br />
        <button onClick={() => { this.props.toRecord()}}>Рекорды</button><br />
        <button onClick={() => { this.props.toQuestions()}}>Вопросы</button>
        {
          //<button onClick={this.delete}>Delete All</button> 
        }
      </React.Fragment>
    );
  }
}
  
export default StartPage;