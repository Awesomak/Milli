import React, { Component } from 'react';

class Answer extends Component {
    state = {
        ok: false
    }

    check = (e) => {
        var target = e.target;
        this.props.disable();
        target.classList.add("select");
        setTimeout(() => {
        if (this.state.ok) {
            target.classList.add("right");
            setTimeout(() => this.props.next(true),1000)
        } else {
            target.classList.add("false");
            setTimeout(() => this.props.next(false),500)
        }
        },2000)
    }

    componentWillMount() {
        setTimeout(() => {
            var val = this.props.answer;
        var id = this.props.id;
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
              if (check) {
                  this.setState({
                      ok : true
                  })
              }
          });
        }, 200);
    }



render() {
    return (
    <React.Fragment>
        <div className="polygon">
            <button onClick={ this.check } className="answer">{ this.props.answer }</button>
        </div>
    </React.Fragment>
    );
}
}
  
export default Answer;