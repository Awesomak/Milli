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
        <img src="./maxresdefault.png" alt="Миллионер" id="logo"/>
        <div className="polygon">
          <button onClick={() => { this.props.toQuest()}}>Начать</button>
        </div>
        <div className="polygon">
          <button onClick={() => { this.props.toRecord()}}>Рекорды</button>
        </div>
        <div className="polygon">
          <button onClick={() => { this.props.toQuestions()}}>Вопросы</button>
        </div>
        {
          //<button onClick={this.delete}>Delete All</button> 
        }
      </React.Fragment>
    );
  }
}
  
export default StartPage;