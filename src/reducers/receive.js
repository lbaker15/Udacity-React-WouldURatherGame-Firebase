import { RECEIVE_DATA } from '../actions/receive'
import { PUSH_VOTE_TO_USER } from '../actions/votes'

export default function receive (state = [], action) {
    switch(action.type) {
        case RECEIVE_DATA :
            return state.concat(action.users)
        case PUSH_VOTE_TO_USER :
            let user = state[0][action.answer.authedUser]
            let answers = {...user.answers, [action.answer.qid]: action.answer.answer}
            user.answers = {...answers}
            return {
                ...state
            }
        default :
            return state
    }
}