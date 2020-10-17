import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routing } from '../actions/create'

class Login extends React.Component {
    createPage = () => {
        this.props.dispatch(routing(true))
    }
    render () {
        const users = Object.values(this.props.receive[0])
        return (
            <div>
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
                            className="button userC">Create New User</button>
                        </Link>
                        <button className="button login" onClick={(e) => this.props.login(e)}>Login</button>
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
    signup: state.signup,
}))(Login)