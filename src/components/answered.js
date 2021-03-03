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
    bg = () => {
        const colors = ["#ffec82", "#ffec82", "#b866ff", "#54ecfd", "#b866ff", "#54ecfd", "#ffbce7", "#ffd7db", "#ffbce7", "#6b7fff"]
        let i = Math.floor(Math.random() * colors.length)
        return colors[i]
    }
    top = () => {
        let i = Math.floor(Math.random() * 150)
        return i + "px"
    }
    leftOne = () => {
        let i = Math.floor(Math.random() * 12.5) + 75
        return i + "%"
    }
    leftTwo = () => {
        let j = Math.floor(Math.random() * 50) 
        return - + j + "px"
    }
    scale = () => {
        let i = Math.ceil(Math.random() * 15) + 8 
        return `scale(${i/10})`
    }
    render () {
        const {answered, unanswered} = this.props;
        console.log("HOME LIST", this.props.answered, this.props.unanswered)
        if (this.props.answered === 0 && this.props.unanswered.length === 0) {
            return (
            <div className="aligner">
                <div className="loader"></div>
            </div>
            )
        } else {
        if (this.state.answered === false) {
            if (unanswered.length === 0) {
                return (
                    <React.Fragment>
                    <div className="answered">
                        <div className="row">
                            <button 
                            className="toggle colorSix moveUp"
                            onClick={() => this.answered()}
                            >Answered</button>
                        </div>
                    </div>
                    <div className="cardAligner noQuestions">
                    You've answered all the questions. Why not add another!
                    </div>
                    </React.Fragment>
                )
            } else {
                return (
                    <div className="answered">
                        <div className="row">
                            <button 
                            className="toggle colorSix"
                            onClick={() => this.answered()}
                            >Answered</button>
                        </div>
                        <h1>Unanswered</h1>
                        {this.props.unanswered.map((x,i) => {
                        return (
                            <div className="cardAligner" key={x.timestamp}>
                            <div style={{  transform: this.scale(), marginTop: this.top(), marginLeft: (i % 2) ? this.leftOne() : this.leftTwo() ,background: this.bg()  }} className="randomCircle" />
                            <Link style={{ textDecoration:'none' }} to={`/question/${x.id}`}>
                                <h2 className="link">Would You Rather...</h2>
                            </Link>

                            <div key={x.id} className="map">
                            <button 
                            value={x.optionOne.text}
                            name={x.id}
                            key={x.optionOne.text} 
                            className="cardMapMain">
                            {x.optionOne.text}
                            </button>

                            <button 
                            value={x.optionTwo.text}
                            name={x.id}
                            key={x.optionTwo.text}  
                            className="cardMapMain">
                            {x.optionTwo.text}
                            </button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                )}
    } else {
        const optionOneVotes = this.props.answered.map(x => {
            return Object.values(x.optionOne.votes).map(x => {
                return Object.keys(x).splice(1)
            })
        })
        const optionTwoVotes = this.props.answered.map(x => {
            return Object.values(x.optionTwo.votes).map(x => {
                return Object.keys(x).splice(1)
            })
        })
        if (answered.length === 0) {
            return (
                <div className="answered">
                    <div className="row">
                        <button 
                        className="toggle colorSix"
                        onClick={() => this.answered()}
                        >Answered</button>
                    </div>
                    <div className="cardAligner">
                    You've not answered any questions yet. Why not answer one now!
                    </div>
                </div>
            )
        } else {
        return (
        <div className="answered">
            <div className="row">
            <button 
            className="toggle colorSix"
            onClick={() => this.answered()}
            >Unanswered</button>
            </div>
            <h1>Answered</h1>
            {this.props.answered.map((x, i) => {
                
                    const oneVotes = Object.values(x.optionOne.votes).map(function(x) {
                        return Object.keys(x).map(function(x, i, a){
                            if (a.length === 1) { return "No one yet!" } 
                            else if (a.length > 1 && i > 0 && i < a.length - 1) { return x + " & " }
                            else if (a.length > 1 && i === a.length - 1) { return x + "." }
                            else { return " " }
                        })
                    })
                    const twoVotes = Object.values(x.optionTwo.votes).map(function(x) {
                        return Object.keys(x).map(function(x, i, a) {
                            if (a.length === 1) { return "No one yet!" } 
                            else if (a.length > 1 && i > 0 && i < a.length - 1) { return x + " & " }
                            else if (a.length > 1 && i === a.length - 1) { return x + "." }
                            else { return " " }
                        })
                    })
                    const oneLength =  Object.values(x.optionOne.votes).map(x => {
                        return Object.keys(x)
                    })
                    const oneLengthNumber = oneLength[0].length - 1
                    const twoLength =  Object.values(x.optionTwo.votes).map(x => {
                        return Object.keys(x)
                    })
                    const twoLengthNumber = twoLength[0].length - 1
                        return (
                            <div key={x.timestamp}>
                            <div style={{  transform: this.scale(), marginTop: this.top(), marginLeft: (i % 2) ? this.leftOne() : this.leftTwo() ,background: this.bg()  }} className="randomCircle" />
                            <h2>Would You Rather...</h2>
      
                            <div key={x.id} className="map">
                                <button 
                                key={x.optionOne.text} 
                                name={x.id}
                                value={x.optionOne.text}
                                className={(Object.keys(x.optionOne.votes[0]).includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                                >
                                    {x.optionOne.text}
                                    <br />
                                    <br />
                                    Voted for by: {oneVotes}
                                    <br />
                                    <br />
                                    Out of {oneLengthNumber + twoLengthNumber} people who voted in this poll, {oneLengthNumber / (oneLengthNumber + twoLengthNumber) * 100 + "%"} chose this option!
                                </button>

                                <button 
                                key={x.optionTwo.text} 
                                name={x.id}
                                value={x.optionTwo.text}
                                className={(Object.keys(x.optionTwo.votes[0]).includes(this.props.signup)) ? "cardMapGreen" : "cardMap"}
                                >
                                    {x.optionTwo.text}
                                    <br />
                                    <br />
                                    Voted for by: {twoVotes}
                                    <br />
                                    <br />
                                    Out of {oneLengthNumber + twoLengthNumber} people who voted in this poll, {twoLengthNumber / (oneLengthNumber + twoLengthNumber) * 100 + "%"} chose this option!
                                </button>
                            </div>
                            </div>
                        )
                    })}
        </div>
        )}
        }}
    }
}

export default connect((state) => ({
    unanswered: state.unanswered,
    answered: state.answered,  
    signup: state.signup, 
    questions: state.questions,
    receive: state.receive
}))(QuestionList)