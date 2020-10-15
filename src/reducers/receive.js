import { RECEIVE_DATA } from '../actions/receive'
import { PUSH_VOTE_TO_USER } from '../actions/votes'
import { FORMAT } from '../actions/format'
import { CREATE } from '../actions/create'

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
        case FORMAT :        
            if(state[0][action.question[0].author].created !== undefined) {
                let userTwo = state[0][action.question[0].author]
                let newID = action.question[0].id
                let final = [...userTwo.questions, newID ]
                userTwo.questions = final
                return {
                    ...state
                }     
            } else {
                let userTwo = state[0][action.question[0].author]
                let newID = action.question[0].id
                let final = [...userTwo.questions, newID ]
                userTwo.questions = final
                return {
                    ...state
                }         
        }
        break
        case CREATE :
            let thisID = action.user.id
            let obj = { [thisID]: {...action.user} }
            let toReturn = {...state[0], ...obj}
            let emptyArr = []
            emptyArr.push(toReturn)
            return emptyArr
        default :
            return state
    }
}