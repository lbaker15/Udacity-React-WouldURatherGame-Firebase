import React from 'react';
import { connect } from 'react-redux';
import dog from './images/avatars/dog.png';
import elephant from './images/avatars/elephant.png';
import monkey from './images/avatars/monkey.png';
import { votes, votesEdited } from '../actions/votes';
import { unansweredQuestions } from '../actions/unanswered';
import { answeredQuestions } from '../actions/answered';

class AnsweredLink extends React.Component {
    state = {
        tylermcginnis: elephant,
        sarahedo: dog,
        johndoe: monkey,
        answered: false
    }
    pushVote = (e) => {
        let selectedOpt = (this.props.questions[0][e.target.name].optionOne.text === e.target.value) ? 'optionOne' : 'optionTwo'
        let opp = (this.props.questions[0][e.target.name].optionOne.text === e.target.value) ? 'optionTwo' : 'optionOne'
        
        const quesAuthor = Object.values(this.props.questions[0]).filter(x => x.id === this.props.match.params.value)
        const authorItem = this.props.receive[0][quesAuthor[0].author]
        console.log(authorItem.created)

        //This condition allows created user to vote on own questions
        if (this.props.receive[0][this.props.signup].created || authorItem.created !== undefined) {
            const answer = {
                authedUser: this.props.signup,
                qid: e.target.name,
                answer: selectedOpt,
                opposite: opp,
                created: true
            }
            //Updates the state on user (under receive)
            this.props.dispatch(votesEdited
                (answer))
            //Updates unanswered questions - on time out so the user info passed in has time to update answered questions
            setTimeout(() => {this.props.dispatch(unansweredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 1000)
            setTimeout(() => {this.props.dispatch(answeredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 1000)
            setTimeout(() => {
                this.setState((prev) => ({
                    answered: !prev.answered,
                }))
                }, 2000)
        } else {
            const answer = {
                authedUser: this.props.signup,
                qid: e.target.name,
                answer: selectedOpt,
                opposite: opp
            }
            //Updates the state on user (under receive)
            this.props.dispatch(votes(answer))
            //Updates unanswered questions - on time out so the user info passed in has time to update answered questions
            setTimeout(() => {this.props.dispatch(unansweredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 1000)
            setTimeout(() => {this.props.dispatch(answeredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 1000)
            setTimeout(() => {
                this.setState((prev) => ({
                    answered: !prev.answered,
                }))
            }, 2000)
        }
    }

    render() {      
        const theQuestion = Object.values(this.props.questions[0]).filter(x => x.id === this.props.match.params.value)
        const author = theQuestion[0].author
        const avatar = this.state
        const answeredQ = this.props.answered.filter(x => x.id === theQuestion[0].id)
        console.log(this.props.questions)
        return (
           <div>
               {this.state.answered === false &&
               (
                <div>
                <div className="author">
                    <h3>By {theQuestion[0].author} </h3>
                    <img src={avatar[author]} alt="avatar" />
                </div>
                <div key={theQuestion[0].id} className="map">

                <button 
                    onClick={ (e) => this.pushVote(e) }
                    value={theQuestion[0].optionOne.text}
                    name={theQuestion[0].id}
                    key={theQuestion[0].optionOne.text} 
                    className="cardMap">
                        {theQuestion[0].optionOne.text}
                </button>

                <button 
                    onClick={ (e) => this.pushVote(e) }
                    value={theQuestion[0].optionTwo.text}
                    name={theQuestion[0].id}
                    key={theQuestion[0].optionTwo.text}  
                    className="cardMap">
                        {theQuestion[0].optionTwo.text}
                </button>

            </div>
            </div>
               )
            }
            {this.state.answered === true && (
                <div>
                <div className="map">
                    <button 
                        name={answeredQ[0].id}
                        value={answeredQ[0].optionOne.text}
                        className={(answeredQ[0].optionOne.votes.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                    >
                        {answeredQ[0].optionOne.text}
                            <br />
                            <br />
                        Voted for by: {answeredQ[0].optionOne.votes.map(x => {
                            return <li key={x}>{x}</li>
                            })}
                            <br />
                            <br />
                        Out of {answeredQ[0].optionOne.votes.length + answeredQ[0].optionTwo.votes.length} people who voted in this poll, {answeredQ[0].optionOne.votes.length / (answeredQ[0].optionOne.votes.length + answeredQ[0].optionTwo.votes.length) * 100 + "%"} chose this option!
                    </button>

                    <button 
                        name={answeredQ[0].id}
                        value={answeredQ[0].optionTwo.text}
                        className={(answeredQ[0].optionTwo.votes.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                    >
                        {answeredQ[0].optionTwo.text}
                        <br />
                        <br />
                    Voted for by: {answeredQ[0].optionTwo.votes.map(x => {
                        return <li key={x}>{x}</li>
                        })}
                        <br />
                        <br />
                        Out of {answeredQ[0].optionOne.votes.length + answeredQ[0].optionTwo.votes.length} people who voted in this poll, {answeredQ[0].optionTwo.votes.length / (answeredQ[0].optionOne.votes.length + answeredQ[0].optionTwo.votes.length) * 100 + "%"} chose this option!
                    </button>

                </div>

                </div>
            )
            }
            </div>
        )
    }
}


export default connect((state) => ({
    questions: state.questions,
    receive: state.receive,
    signup: state.signup,
    answered: state.answered,
}))(AnsweredLink)