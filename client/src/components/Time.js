import React, { Component } from 'react';

class Time extends Component {

render() {
    return (
    <React.Fragment>
        <div>{ this.props.time }</div>
    </React.Fragment>
    );
}
}
  
export default Time;