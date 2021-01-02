import React from 'react'
import { connect } from 'react-redux'
import dog from './images/avatars/dog.png';
import elephant from './images/avatars/elephant.png';
import monkey from './images/avatars/monkey.png';

class board extends React.Component {
    avatars = {
        "elephant": elephant,
        "dog": dog,
        "monkey": monkey
    }
    render() {
        const leaderBoard = this.props.receive.map(x => {
            return {
                "name": x.name,
                "avatar": x.avatarURL,
                "ques": Object.values(x.questions).length - 1,
                "ans": Object.entries(x.answers).length - 1,
                "id": x.id,
                "score": (Object.values(x.questions).length - 1) + (Object.entries(x.answers).length - 1)
                }
            })
        
        const ordered = leaderBoard.sort(function(a, b){return b.score - a.score})
        const avatar = this.avatars

        return (
            <div className="central">
                {ordered.map(x => {
                    return (
                        <div key={x.id} className="leader">
                            ID: {x.id}
                            <br />
                            <img alt="avatar" className="image" src={avatar[x.avatar]} />
                            <br />
                            Name: {x.name}
                            <br />
                            Overall score: {x.score}
                            <br />
                            Questions created: {x.ques}
                            <br />
                            Questions answered: {x.ans}
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default connect((state) => ({
    receive: state.receive,
}))(board)
