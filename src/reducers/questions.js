import { RECEIVE_QUESTIONS } from '../actions/questions'
import { PUSH_VOTE_TO_USER } from '../actions/votes'
import { FORMAT } from '../actions/format'

export default function questions (state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            //console.log("reducer", state, action.questions.filter(x => x))
            const newStat = action.questions
            return newStat
        default :
            return state
    }
}
