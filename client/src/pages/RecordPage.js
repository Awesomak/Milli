import React, { Component } from 'react';

class RecordPage extends Component {
  state = {
    result: null
  }

  componentDidMount() {
    fetch('/api/results')
      .then(res => res.json())
      .then(result => this.setState({result}, () => console.log('Results fetched...', result)));
  }

  render() {
    return (
      <React.Fragment>
          <h1>Result</h1>
          <table>
            <tbody>
            {this.state.result ? this.state.result.map(result => 
              <tr key={result._id}>
              <td>{result.name}</td><td>{result.result}</td>
              </tr>
            ): null}
            </tbody>
          </table>
          <button className="answer" onClick={ this.props.toStart }>На главную</button>
      </React.Fragment>
    );
  }
}

export default RecordPage;