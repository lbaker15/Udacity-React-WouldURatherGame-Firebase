import { RECEIVE_DATA } from '../actions/receive'
import { PUSH_VOTE_TO_USER } from '../actions/votes'
import {QUES_CREATED} from '../actions/format'

export default function receive (state = [], action) {
    switch(action.type) {
        case RECEIVE_DATA :
            return action.users
        case QUES_CREATED :
            return action.users
        case PUSH_VOTE_TO_USER :
            return action.answer
        default :
            return state
    }
}