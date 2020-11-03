import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routing } from '../actions/create'
import { signIn } from '../actions/signup'
import { unansweredQuestions } from '../actions/unanswered'
import { answeredQuestions } from '../actions/answered'

class Login extends React.Component {
    state = {
        x: 0,
        y: 0,
    }
    createPage = () => {
        this.props.dispatch(routing(true))
    }
    login = (e) => {
        const user = document.getElementById("userList").value
        const toSend = this.props.receive.filter(x => x.id === user)
        this.props.dispatch(signIn(toSend[0].id))
        //Wait for user info before calling
        setTimeout(() => {this.props.dispatch(unansweredQuestions(this.props.questions, user, this.props.receive))}, 100)
        setTimeout(() => {this.props.dispatch(answeredQuestions(this.props.questions, user, this.props.receive))}, 200)
        this.props.log()
    }
    handleMouseMove = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    
    render () { 
        //console.log(this.state.x)
        const small = this.state.x / 40 - 20
        const smallY = this.state.y / 40 - 20
        const medium = this.state.x / 18 - 20
        const mediumY = this.state.y / 18 - 40
        const large = this.state.x / 12 - 50
        const largeY = this.state.y / 12 - 50
        const users = this.props.receive
        return (
            <div onMouseMove={this.handleMouseMove} style={{height: "100vh" ,overflow: "hidden"}} className="aligner">
                <div 
                style={{transform: `translate(${small}px, ${smallY}px)`, overflow: "hidden"}}
                className="circleOne"></div>
                <div className="circleTwo"
                style={{transform: `translate(${medium}px, ${mediumY}px)`}}></div>
                <div className="circleThree"
                style={{transform: `translate(${medium}px, ${mediumY}px)`}}></div>
                <div className="circleFour"
                style={{transform: `translate(${medium}px, ${mediumY}px)`}}></div>
                <div className="circleFive"
                style={{transform: `translate(${large}px, ${largeY}px)`}}></div>
                <div className="circleSix"></div>
                <div className="circleSeven"
                style={{transform: `translate(${large}px, ${largeY}px)`}}></div>
                <div className="circleEight"
                style={{transform: `translate(${large}px, ${largeY}px)`}}></div>
                <div className="circleNine"
                style={{transform: `translate(${medium}px, ${mediumY}px)`}}></div>
                <div className="circleTen"
                style={{transform: `translate(${large}px, ${largeY}px)`}}></div>
                <div className="circleEleven"
                style={{transform: `translate(${medium}px, ${mediumY}px)`}}></div>


                <div className="signUp">
                    <h1 className="head">Would You Rather...</h1>
                    <h1>SignIn</h1>
                    <select id="userList">
                        
                        {users.map(x => {
                            return (
                                <option 
                                key={x.id}
                                value={x.id} 
                                >{x.id}</option>
                                )
                        })}

                    </select>
                    <div className="signIn">
                        <Link to="/create">
                            <button 
                            onClick={() => this.createPage()}
                            className="button colorFive userC">Create New User</button>
                        </Link>
                        <button className="button colorFive login" onClick={(e) => this.login(e)}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    signup: state.signup,
    receive: state.receive,
    questions: state.questions,
    unanswered: state.unanswered,
    answered: state.answered,
}))(Login)