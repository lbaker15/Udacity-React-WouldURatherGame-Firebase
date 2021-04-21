import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/create'
import {getData} from '../actions/receive'
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
        alert: '',
        nameclick: false,
        idclick: false
    }
    create = () => {
        let one = String(this.state.id).includes('.')
        let two = String(this.state.name).includes('.')
        if (one || two) {
            this.setState({
                alert: 'Please ensure name and username do NOT include any characters such as: @ , . ! ? \ / '
            })
        } else {
        if (this.state.avatar.length && this.state.name.length && this.state.id.length > 1) {
            
            const itemsRef = firebase.database().ref('items')
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val()
                const person = items[this.state.id]
                console.log('LOOK HERE', person, person === undefined)
                if (person !== undefined) {
                    this.setState({
                        alert: 'This username has been taken.'
                    })
                }
                else if (person === undefined) {
                    const obj = {
                        "id": this.state.id,
                        "name": this.state.name,
                        avatarURL: this.state.avatar
                    }
                    const ans = {"123": 'optionOne',}; const ques = ["8xf0y6ziyjabvozdd253nd"];
                    const toPush = 
                    {[this.state.id]: { 
                        ...obj, 
                        answers: ans,
                        questions: ques  
                        } 
                    }
                    new Promise((res, rej) => {
                        const itemsRef = firebase.database().ref('items');
                        const newRef = itemsRef.push();
                        const newKey = newRef.key
                        const realRef = itemsRef.child(this.state.id)
                        res(realRef.set(toPush) )
                    })
                    .then(() => this.props.dispatch(getData()))
                    .then(() => {
                        this.setState({
                            alert: 'User created successfully, you will now be redirected to the homepage.'
                        })
                        setTimeout(() => {
                            this.setState((prev) => ({
                            submitted: !prev.submitted,
                        }))       
                        }, 10000)        
                    }) 
                } else {
                    // this.setState({
                    //     alert: 'This username is already taken, please select another.'
                    // })
                }
            })
            /**/     
        } else {
            this.setState({
                alert: "Please fill in all fields before submitting."
            })
        }
    }
    }
    update = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    clicked = (e) => {
        const value = e.target.id + "click"
        this.setState((prev) => ({
            [value]: !prev.value
        }))
    }
    componentDidMount() {
        this.props.dispatch(routing(true))

        const itemsRef = firebase.database().ref('items')
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val()
            let newState = []
            console.log(Object.values(items))
        })    
    }
    handleAvatar = (e) => {
        this.setState({
            avatar: e.target.id
        })
    }
    render() {
        const {name, id, avatar} = this.state;
         return (
         <div className="aligner">
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
                    className={this.state.name.length > 0 ? "green" : this.state.nameclick === false ? "" : "red"}
                    onClick={(e) => this.clicked(e)}
                    onChange={(e) => this.update(e)}
                    ></input>

                    <label>UserName:</label>
                    <input
                    value={this.state.id}
                    id="id"
                    className={this.state.id.length > 0 ? "green" : this.state.idclick === false ? "" : "red"}
                    onClick={(e) => this.clicked(e)}
                    onChange={(e) => this.update(e)}
                    ></input>

                    <label>Select Your Avatar</label>
                    <div className="selector">
                        <img alt="avatarOne" onClick={(e) => this.handleAvatar(e)} id="dog" className={(this.state.avatar === 'dog') ? "selectGreen" : "select"} src={dog} />
                        <img alt="avatarTwo" onClick={(e) => this.handleAvatar(e)} id="elephant" className={(this.state.avatar === 'elephant') ? "selectGreen" : "select"}  src={elephant} />
                        <img alt="avatarThree" onClick={(e) => this.handleAvatar(e)} id="monkey" className={(this.state.avatar === 'monkey') ? "selectGreen" : "select"}  src={monkey} />
                    </div>

                    <button 
                    onClick={() => this.create()}
                    className={(name.length > 1 && id.length > 1 && avatar.length > 1) ? "button blue" : "button blueOpaque"}> 
                        Create My User
                    </button>
                    <Link to="/">
                        <button className="button blue">
                            Home
                        </button>
                    </Link>
                </span>
            </div>
         </div>
        )
    }
}

export default connect((state) => ({

}))(CreateUser)