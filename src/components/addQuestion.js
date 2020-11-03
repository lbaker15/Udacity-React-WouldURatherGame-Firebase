import React from 'react'
import { connect } from 'react-redux'
import { formatting, formattingEdit } from '../actions/format'
import { Redirect } from 'react-router-dom'
import { unansweredQuestions } from '../actions/unanswered'
import { answeredQuestions } from '../actions/answered'


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
        //console.log(this.props.receive.filter(x => x.id === this.props.signup))
        if (this.state.optionOne.length > 1 && this.state.optionTwo.length > 1) {
                const question = {
                    optionOneText: this.state.optionOne,
                    optionTwoText: this.state.optionTwo,
                    author: this.props.signup,
                }
                this.setState((prev) => ({ btnPressed: !prev.btnPressed }))
                const processQues = new Promise((res, rej) => {
                    res(this.props.dispatch(formattingEdit(question, this.props.receive, this.props.questions)))
                })
                .then(() => this.props.dispatch(unansweredQuestions(this.props.questions, this.props.signup, this.props.receive)) )
                .then(() => this.props.dispatch(answeredQuestions(this.props.questions, this.props.signup, this.props.receive)) )
                .then(() => {
                    setTimeout(() => {
                        this.setState((prev) => ({
                            submitted: !prev.submitted,
                        }))
                    }, 1000)
                })
        } else {
            this.setState({
                alert: 'Please fill in both fields'
            })
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
                    className="button submit colorSix"
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