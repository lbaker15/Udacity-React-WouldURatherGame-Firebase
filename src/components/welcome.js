import React from 'react'
import { connect } from 'react-redux'

class Welcome extends React.Component {
    render () {
        const {questions} = this.props
 
        return (
            <div></div>
        )
    }
 }

export default connect((state) => ({
    signup: state.signup,
    questions: state.questions,
}))(Welcome)