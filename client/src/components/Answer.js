import React, { Component } from 'react';

class Answer extends Component {
    state = {
        ok: false
    }

    componentWillReceiveProps() {
        if(this.props.answer === this.props.rig) {
            this.setState({
                ok: true
            })
        } else {
            this.setState({
                ok: false
            })
        }
    }

    componentWillMount() {
        if(this.props.answer === this.props.rig) {
            this.setState({
                ok: true
            })
        } else {
            this.setState({
                ok: false
            })
        }
    }



render() {
    return (
    <React.Fragment>
        <button onClick={() => { this.props.next(this.state.ok)}}>{ this.props.answer }</button>
    </React.Fragment>
    );
}
}
  
export default Answer;