import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Customers from '../components/customers'


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
        <button onClick={() => { this.props.toRecord()}}>Рекорды</button>
        <Router>
          <div>
            <Link to="/question">Вопросы</Link>
            <Route path="/question" component={Customers} />
          </div>
        </Router>
        {
          //<button onClick={this.delete}>Delete All</button> 
        }
      </React.Fragment>
    );
  }
}
  
export default StartPage;