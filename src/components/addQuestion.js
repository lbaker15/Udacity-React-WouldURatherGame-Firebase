import React from 'react'
import { connect } from 'react-redux'
import { formatting } from '../actions/format'

class addQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    update = (e) => {
        if (e.target.name === "optionOne") {
            this.setState({
                optionOne: e.target.value,
            })
        } else {
            this.setState({
                optionTwo: e.target.value,
            })            
        }
    }
    submit = (e) => {
        e.preventDefault()
        const question = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: this.props.signup,
        }
        this.props.dispatch(formatting(question))
    }
    render() {
        return(
            <div className="add">
                <h2>Would you rather...</h2>
                <form className="center">
                    <input 
                    value={this.state.optionOne}
                    onChange={(e) => this.update(e)}
                    name="optionOne"
                    placeholder="Option one..."></input>
                    <input
                    value={this.state.optionTwo}
                    onChange={(e) => this.update(e)}
                    name="optionTwo"
                    placeholder="Option Two..."                    
                    ></input>
                    <button 
                    type="submit" 
                    className="button"
                    onClick={(e) => this.submit(e)}
                    >Submit</button>
                </form>
            </div>
        )
    }
}

export default connect((state) => ({
    signup: state.signup,
}))(addQuestion)