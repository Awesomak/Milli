import React, { Component } from 'react';

class Hall extends Component{

render() {

    return (
    <React.Fragment>
        <div id="hall">
          <div className="flex bottom">
            <div className="help_div" style={{ height: this.props.a*3 }}><p>{ this.props.a }</p></div>
            <div className="help_div" style={{ height: this.props.b*3 }}><p>{ this.props.b }</p></div>
            <div className="help_div" style={{ height: this.props.c*3 }}><p>{ this.props.c }</p></div>
            <div className="help_div" style={{ height: this.props.d*3 }}><p>{ this.props.d }</p></div>
          </div>
          <div className="flex spans">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
          </div>
          <button className="answer" onClick={ this.props.continue_work }>Продолжить</button>
        </div>
    </React.Fragment>
    );
}
}
  
export default Hall;