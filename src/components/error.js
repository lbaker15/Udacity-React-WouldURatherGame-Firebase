import React from 'react'
import { connect } from 'react-redux'

class Error extends React.Component {
    render() {
        return (
            <div>404 Error: page not found. Please sign in.</div>
        )
    }
}

export default connect((state) => ({

}))(Error)