import { RECEIVE_QUESTIONS } from '../actions/questions'
import { PUSH_VOTE_TO_USER } from '../actions/votes'
import { FORMAT } from '../actions/format'

export default function questions (state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            console.log("FIRED")
            return state.concat(action.questions)
        case PUSH_VOTE_TO_USER :
            let questionOption = state[0][action.answer.qid]
            questionOption[action.answer.answer].votes.push(action.answer.authedUser)
            questionOption[action.answer.opposite].votes.filter(item => item !== action.answer.authedUser)
            return {
                ...state,
                [action.answer.qid]: questionOption
            }
        case FORMAT :
            const target = []
            const id = action.question[0].id
            const returnedTarget = Object.assign(target, state)
            const ob = {
                [id]: action.question[0],
                ...returnedTarget[0]
            }
            const newState = []
            newState.push(ob)
            return newState 
        default :
            return state
    }
}
