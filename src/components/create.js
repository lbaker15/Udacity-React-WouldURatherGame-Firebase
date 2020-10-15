import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/create'
import { Link } from 'react-router-dom'
import { routing } from '../actions/create'

class CreateUser extends React.Component {
    create = () => {
        const obj = {
            "id": this.state.id,
            "name": this.state.name,
            avatarURL: "cat",
            answers: { },
            questions: [],
            created: true
        }
        this.props.dispatch(createUser(obj))
    }
    state = {
        name: '',
        id: '',
    }
    updateName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    updateID = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    componentDidMount() {
        this.props.dispatch(routing(true))
    }
    render() {
        return (
            <div className="create">
                <h2>User Registration</h2>
                <span>
                    <label>Name:</label>
                    <input
                    value={this.state.name}
                    onChange={(e) => this.updateName(e)}
                    ></input>

                    <label>UserName:</label>
                    <input
                    value={this.state.id}
                    onChange={(e) => this.updateID(e)}
                    ></input>

                    <button 
                    onClick={() => this.create()}
                    className="button">
                        Create My User
                    </button>
                    <Link to="/">
                        <button className="button">
                            Home
                        </button>
                    </Link>
                </span>
            </div>
        )
    }
}

export default connect((state) => ({

}))(CreateUser)