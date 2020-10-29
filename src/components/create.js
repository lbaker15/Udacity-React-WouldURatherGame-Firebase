import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/create'
import { Link } from 'react-router-dom'
import { routing } from '../actions/create'
import { Redirect } from 'react-router-dom'
import dog from './images/avatars/dog.png';
import elephant from './images/avatars/elephant.png';
import monkey from './images/avatars/monkey.png';
import firebase from '../firebase'


class CreateUser extends React.Component {
    state = {
        name: '',
        id: '',
        avatar: '',
        submitted: false,
        alert: ''
    }
    create = () => {
        if (this.state.avatar.length && this.state.name.length && this.state.id.length !== 0) {
            const obj = {
                "id": this.state.id,
                "name": this.state.name,
                avatarURL: this.state.avatar,
                created: true
            }
            const ans = {"8xf0y6ziyjabvozdd253nd": 'optionOne',}; const ques = ["8xf0y6ziyjabvozdd253nd"];
            const itemsRef = firebase.database().ref('items')
            const toPush = 
            {[this.state.id]: { 
                ...obj, 
                answers: ans,
                questions: ques  
                } 
            }
            itemsRef.push(toPush)

            setTimeout(() => {
                this.setState((prev) => ({
                    submitted: !prev.submitted,
                }))
                }, 1000)
        } else {
            this.setState({
                alert: "Please fill in all fields before submitting."
            })
        }
    }
    update = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    componentDidMount() {
        this.props.dispatch(routing(true))

        const itemsRef = firebase.database().ref('items')
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val()
            let newState = []
            console.log(Object.values(items))
            /*for (let item in items) {
                newState.push({
                    avatarURL: items[item].url,
                    name: items[item].name,
                    id: items[item].username
                })
            }
            this.setState({
                items: newState
            })*/
        })    
    }
    handleAvatar = (e) => {
        this.setState({
            avatar: e.target.id
        })
    }


    render() {
        return (
            <div className="create">
                {this.state.submitted === true &&
                    <Redirect to="/" />
                }
                <h2>User Registration</h2>
                {this.state.alert}
                <span>
                    <label>Name:</label>
                    <input
                    value={this.state.name}
                    id="name"
                    onChange={(e) => this.update(e)}
                    ></input>

                    <label>UserName:</label>
                    <input
                    value={this.state.id}
                    id="id"
                    onChange={(e) => this.update(e)}
                    ></input>

                    <label>Select Your Avatar</label>
                    <div className="selector">
                    <img alt="avatarOne" onClick={(e) => this.handleAvatar(e)} id="dog" className="select" src={dog} />
                    <img alt="avatarTwo" onClick={(e) => this.handleAvatar(e)} id="elephant" className="select" src={elephant} />
                    <img alt="avatarThree" onClick={(e) => this.handleAvatar(e)} id="monkey" className="select" src={monkey} />
                    </div>

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