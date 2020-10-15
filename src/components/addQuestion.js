import React from 'react'
import { connect } from 'react-redux'
import { formatting, formattingEdit } from '../actions/format'

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

        if(this.props.receive[0][this.props.signup].created === true) {
            const question = {
                optionOneText: this.state.optionOne,
                optionTwoText: this.state.optionTwo,
                author: this.props.signup,
            }
            this.props.dispatch(formattingEdit(question, this.props.receive, this.props.questions))
        } else {
            const question = {
                optionOneText: this.state.optionOne,
                optionTwoText: this.state.optionTwo,
                author: this.props.signup,
            }
            this.props.dispatch(formatting(question))
        }
    }
    render() {
        return(
            <div className="textCenter">
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