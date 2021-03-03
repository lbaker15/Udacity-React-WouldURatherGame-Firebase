import React from 'react';
import { connect } from 'react-redux';
import dog from './images/avatars/dog.png';
import elephant from './images/avatars/elephant.png';
import monkey from './images/avatars/monkey.png';
import { votes, votesEdited } from '../actions/votes';
import { unansweredQuestions } from '../actions/unanswered';
import { answeredQuestions } from '../actions/answered';
import Err404 from './404'

class AnsweredLink extends React.Component {
    state = {
        answered: false
    }
    avatars = {
        "elephant": elephant,
        "dog": dog,
        "monkey": monkey
    }
    pushVote = (e) => {
        let selectedOpt = (Object.values(this.props.questions.filter(x => x[e.target.name])[0])[0].optionOne.text === e.target.value) ? 'optionOne' : 'optionTwo'
        let opp = (Object.values(this.props.questions.filter(x => x[e.target.name])[0])[0].optionOne.text === e.target.value) ? 'optionTwo' : 'optionOne'
 
        //const quesAuthor = Object.values(this.props.questions[0]).filter(x => x.id === this.props.match.params.value)
        const theQues = Object.values(this.props.questions.filter(x => x[this.props.match.params.value])[0]) 
        const authorItem = this.props.receive.filter(x => x.id === theQues[0].author)
        
            const answer = {
                authedUser: this.props.signup,
                qid: e.target.name,
                answer: selectedOpt,
                opposite: opp
            }
            const myPromise = new Promise((res, rej) => {
                res(this.props.dispatch(votes(answer)))
            })
            .then(() => this.props.dispatch(unansweredQuestions(this.props.questions, this.props.signup, this.props.receive)) )
            .then(() => this.props.dispatch(answeredQuestions(this.props.questions, this.props.signup, this.props.receive)) )
            .then(() =>  this.setState((prev) => ({answered: !prev.answered,})) )
            .catch((err) => console.log(err))

    }

    render() {      
        const {questions, receive} = this.props
        const value = this.props.match.params.value
        const theQuestion = questions.filter(x => x[value])

        if (theQuestion.length !== 0) {
        const quesAuthor = Object.values(theQuestion[0])[0].author
        console.log(quesAuthor)
        const avatarURL = receive.filter( x => x.id === quesAuthor )[0].avatarURL
        const author = quesAuthor
        const avatar = this.avatars
        const answeredQ = this.props.answered.filter(x => x.id === Object.values(theQuestion[0])[0].id)
  
            if (this.state.answered === false) {
            return (
            <div>
                    <div className="author">
                        <h3>By {Object.values(theQuestion[0])[0].author} </h3>
                        <img src={avatar[avatarURL]} alt="avatar" />
                    </div>
                    <div key={Object.values(theQuestion[0])[0].id} className="map">

                    <button 
                        onClick={ (e) => this.pushVote(e) }
                        value={Object.values(theQuestion[0])[0].optionOne.text}
                        name={Object.values(theQuestion[0])[0].id}
                        key={Object.values(theQuestion[0])[0].optionOne.text} 
                        className="cardMap">
                            {Object.values(theQuestion[0])[0].optionOne.text}
                    </button>

                    <button 
                        onClick={ (e) => this.pushVote(e) }
                        value={Object.values(theQuestion[0])[0].optionTwo.text}
                        name={Object.values(theQuestion[0])[0].id}
                        key={Object.values(theQuestion[0])[0].optionTwo.text}  
                        className="cardMap">
                            {Object.values(theQuestion[0])[0].optionTwo.text}
                    </button>

                </div>
                </div>
                )
                } else {
                const answeredVotesTwo = Object.keys(answeredQ[0].optionTwo.votes[0])
                answeredVotesTwo.shift()
                const answeredVotesOne = Object.keys(answeredQ[0].optionOne.votes[0])
                answeredVotesOne.shift()

                return (
                <div className="indvCardAligner">
                    <div className="map">
                        <button 
                            name={answeredQ[0].id}
                            value={answeredQ[0].optionOne.text}
                            className={(answeredVotesOne.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                        >
                            {answeredQ[0].optionOne.text}
                                <br />
                                <br />
                            Voted for by: 
                            {answeredVotesOne.map(x => {
                                return <li key={x}>{x}</li>
                            })}
                                <br />
                                <br />
                            Out of {answeredVotesOne.length + answeredVotesTwo.length} people who voted in this poll, {answeredVotesOne.length / (answeredVotesOne.length + answeredVotesTwo.length) * 100 + "%"} chose this option!
                        </button>

                        <button 
                            name={answeredQ[0].id}
                            value={answeredQ[0].optionTwo.text}
                            className={(answeredVotesTwo.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                        >
                            {answeredQ[0].optionTwo.text}
                            <br />
                            <br />
                        Voted for by: 
                        {answeredVotesTwo.map(x => {
                            return <li key={x}>{x}</li>
                        })}
                            <br />
                            <br />
                            Out of {answeredVotesTwo.length + answeredVotesOne.length} people who voted in this poll, {answeredVotesTwo.length / (answeredVotesOne.length + answeredVotesTwo.length) * 100 + "%"} chose this option!
                        </button>

                    </div>
                </div>
                )
                } 
            } else {
            return <Err404 />
            }
    }
}


export default connect((state) => ({
    questions: state.questions,
    receive: state.receive,
    signup: state.signup,
    answered: state.answered,
}))(AnsweredLink)