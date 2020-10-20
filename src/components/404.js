import React from 'react'

class Err404 extends React.Component {
    render () {
        return (
            <div className="error">
                404 error: Question not found.  Please enter a valid question ID.
            </div>
        )
    }
}

export default Err404