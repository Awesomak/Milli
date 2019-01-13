import React, { Component } from 'react';

class Answer extends Component {
    state = {
        ok: false
    }

    componentWillReceiveProps() {
        this.setState({
            ok: this.props.answer === this.props.rig ? true : false
        })
    }

    check = (e) => {
        var target = e.target;
        var val = this.props.answer;
        var id = this.props.id;
        target.classList.add("select");
        fetch('/api/right/'+id, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                right: val
            })
        })
          .then(res => res.json())
          .then(check => {
              setTimeout(() => {
                if(check) {
                    target.classList.add("right");
                    setTimeout(() => this.props.next(true),1000)
                } else {
                    target.classList.add("false");
                    setTimeout(() => this.props.next(false),1000)
                }
              },2000)
          });
    }

    componentDidMount() {
        this.setState({
            ok: false
        })
        this.setState({
            ok: this.props.answer === this.props.rig ? true : false
        })
    }



render() {
    return (
    <React.Fragment>
        <div className="polygon">
            <button onClick={ this.check }>{ this.props.answer }</button>
        </div>
    </React.Fragment>
    );
}
}
  
export default Answer;