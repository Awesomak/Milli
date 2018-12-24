import React, { Component } from 'react';

class ResultPage extends Component {
render() {
    return (
    <React.Fragment>
        <p>Введите имя</p>
        <input placeholder='имя' />
        <p>Ваш результат - { this.props.q }</p>
        <button onClick={ this.props.toStart }>начало</button>
    </React.Fragment>
    );
}
}
  
export default ResultPage;