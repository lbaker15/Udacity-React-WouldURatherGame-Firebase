import React from 'react'
import { connect } from 'react-redux'
import { formatting, formattingEdit } from '../actions/format'
import { Redirect } from 'react-router-dom'

class addQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: '',
        submitted: false,
        btnPressed: false,
    }
    update = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault()
            if(this.props.receive[0][this.props.signup].created === true) {
                const question = {
                    optionOneText: this.state.optionOne,
                    optionTwoText: this.state.optionTwo,
                    author: this.props.signup,
                }
                this.setState((prev) => ({ btnPressed: !prev.btnPressed }))
                this.props.dispatch(formattingEdit(question, this.props.receive, this.props.questions))
                setTimeout(() => {
                    this.setState((prev) => ({
                        submitted: !prev.submitted,
                    }))
                }, 1000)
            } else {
                const question = {
                    optionOneText: this.state.optionOne,
                    optionTwoText: this.state.optionTwo,
                    author: this.props.signup,
                }
                this.setState((prev) => ({ btnPressed: !prev.btnPressed }))
                this.props.dispatch(formatting(question))
                setTimeout(() => {
                    this.setState((prev) => ({
                        submitted: !prev.submitted,
                    }))
                }, 1000)
            }
     }
    render() {
        return(
            <div className="textCenter">

                {this.state.submitted === true &&
                    <Redirect to="/" />
                }
                <h2>Would you rather...</h2>
                <form>
                    <div className="add">
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
                    </div>
                    <button 
                    type="submit" 
                    className="button submit"
                    onClick={(e) => this.submit(e)}
                    disabled={this.state.optionOne.length < 1 || this.state.optionTwo.length < 1 || this.state.btnPressed === true}
                    >Submit</button>
                </form>
            </div>
        )
    }
}

export default connect((state) => ({
    signup: state.signup,
    receive: state.receive,
    questions: state.questions,
}))(addQuestion)