import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class QuestionList extends React.Component {
    state = {
        answered: false,
    }
    answered = () => {
        this.setState((prev) => ({
            answered: !prev.answered
        }))
    }
    render () {
        if (this.state.answered === false) {
        return (
            <div className="answered">
                <div className="row">
                    <button 
                    className="toggle"
                    onClick={() => this.answered()}
                    >Answered</button>
                </div>
                
                    <h1>Unanswered</h1>
                        {this.props.unanswered.map(x => {
                     
                        return (
                            <div key={x.timestamp}>

                            <Link style={{ textDecoration:'none' }} to={`/question/${x.id}`}>
                                <h2 className="link">Would You Rather...</h2>
                            </Link>

                            <div key={x.id} className="map">

                                <button 
                                value={x.optionOne.text}
                                name={x.id}
                                key={x.optionOne.text} 
                                className="cardMap">
                                    {x.optionOne.text}
                                </button>

                                <button 
                                value={x.optionTwo.text}
                                name={x.id}
                                key={x.optionTwo.text}  
                                className="cardMap">
                                    {x.optionTwo.text}
                                </button>

                            </div>
                            </div>
                        )
                    })}
            </div>
        )
    } else {
        return (
        <div className="answered">
            <div className="row">
            <button 
            className="toggle"
            onClick={() => this.answered()}
            >Unanswered</button>
            </div>
            <h1>Answered</h1>
            {this.props.answered.map(x => {
                
                        const oneVotes = x.optionOne.votes.map(function(x, i, a) {
                            if (a.length === 1) { return x } 
                            else if (a.length > 1 && i < a.length - 1) { return x + " & " }
                            else if (a.length > 1 && i === a.length - 1) { return x + "." }
                            else { return " " }
                        })
                        const twoVotes = x.optionTwo.votes.map(function(x, i, a) {
                            if (a.length === 1) { return x } 
                            else if (a.length > 1 && i < a.length - 1) { return x + " & " }
                            else if (a.length > 1 && i === a.length - 1) { return x + "." }
                            else { return " " }
                        })

                        return (
                            <div key={x.timestamp}>
                            <h2>Would You Rather...</h2>
      
                            <div key={x.id} className="map">
                                <button 
                                key={x.optionOne.text} 
                                name={x.id}
                                value={x.optionOne.text}
                                className={(x.optionOne.votes.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                                >
                                    {x.optionOne.text}
                                    <br />
                                    <br />
                                    Voted for by: {(oneVotes.length !== 0) ? oneVotes : "0 people"}
                                    <br />
                                    <br />
                                    Out of {x.optionOne.votes.length + x.optionTwo.votes.length} people who voted in this poll, {x.optionOne.votes.length / (x.optionOne.votes.length + x.optionTwo.votes.length) * 100 + "%"} chose this option!
                                </button>

                                <button 
                                key={x.optionTwo.text} 
                                name={x.id}
                                value={x.optionTwo.text}
                                className={(x.optionTwo.votes.includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                                >
                                    {x.optionTwo.text}
                                    <br />
                                    <br />
                                    Voted for by: {(twoVotes.length !== 0) ? twoVotes : "0 people"}
                                    <br />
                                    <br />
                                    Out of {x.optionOne.votes.length + x.optionTwo.votes.length} people who voted in this poll, {x.optionTwo.votes.length / (x.optionOne.votes.length + x.optionTwo.votes.length) * 100 + "%"} chose this option!
                                </button>
                            </div>
                            </div>
                        )
                    })}
        </div>
        )

        } 
    }
}

export default connect((state) => ({
    unanswered: state.unanswered,
    answered: state.answered,  
    signup: state.signup, 
    questions: state.questions,
    receive: state.receive
}))(QuestionList)