import React, { Component } from 'react';

class Question extends Component {
render() {
    return (
    <React.Fragment>
        <p>{ this.props.question }</p>
    </React.Fragment>
    );
}
}
  
export default Question;