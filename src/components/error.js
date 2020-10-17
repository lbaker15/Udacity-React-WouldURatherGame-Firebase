import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class Error extends React.Component {
    render() {
        return (
            <div>
            <div>404 Error: page not found. Please sign in.</div>
            <Link to="/">
                <button className="button">Login Here</button>
            </Link>
            </div>
            )
    }
}

export default connect((state) => ({

}))(Error)