import React, { Component } from 'react';

class Time extends Component {

render() {
    return (
    <React.Fragment>
        <div id="time">{ this.props.time }</div>
    </React.Fragment>
    );
}
}
  
export default Time;