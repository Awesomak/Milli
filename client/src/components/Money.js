import React, { Component } from 'react';

class Money extends Component {
  state = {
    render: false
  }

componentDidMount() {
  if(this.props.quest < 12 && this.props.quest > 0) {
    this.setState({
      render: true
    })
    setTimeout(() => {
      var lis = document.getElementsByTagName('li');
      lis[this.props.quest].classList.add("rightAns");
    },200)
  }
}

render() {
  if(this.state.render) {
    return (
      <React.Fragment>
        <div className="money">
          <ul>
            <li>1000000</li>
            <li>250000</li>
            <li>100000</li>
            <li>50000</li>
            <li className="fire">25000</li>
            <li>10000</li>
            <li>5000</li>
            <li>2000</li>
            <li className="fire">1000</li>
            <li>500</li>
            <li>200</li>
            <li>100</li>
          </ul>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}
}
  
export default Money;