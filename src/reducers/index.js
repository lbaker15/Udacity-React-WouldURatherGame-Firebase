import { combineReducers } from 'redux'

import signup from './signup'
import receive from './receive'
import loading from './loading'
import questions from './questions'
import unanswered from './unanswered'
import answered from './answered'

export default combineReducers({
    signup,
    receive,
    loading,
    questions,
    unanswered,
    answered,
})