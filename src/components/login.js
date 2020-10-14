import React from 'react'
import { connect } from 'react-redux'

class Login extends React.Component {
    render () {
        const users = Object.values(this.props.users[0])
        return (
            <div>
                <div className="signUp">
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
                    <button className="button" onClick={(e) => this.props.login(e)}>Login</button>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
 
}))(Login)