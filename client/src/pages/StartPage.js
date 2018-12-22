import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import RecordPage from './RecordPage'
import Customers from '../components/customers'


class StartPage extends Component {
    render() {
      return (
        <React.Fragment>
            <h1>Миллионер</h1>
            <Router>
              <div>
                <Link to="/question">Начать</Link><br />
                <Link to="/questions">Вопросы</Link><br />
                <Link to="/record">Рекорды</Link>
                <Route path="/questions" component={Customers} />
                <Route path="/question" component={QuestionPage} />
                <Route path="/record" component={RecordPage} />
              </div>
            </Router>
        </React.Fragment>
      );
    }
  }
  
export default StartPage;