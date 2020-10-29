import { ANSWERED } from '../actions/answered'

export default function answered (state=[], action) {
    switch(action.type) {
        case ANSWERED : 
            if (action.questionList !== null) {
                const user = action.answeredQ[0][action.user].answers
                let a = Object.keys(user).map(y => { 
                    return Object.values(action.questionList[0]).filter(x => {
                    return x.id === y
                })
                })
                //Ordering by timestamp
                const times = a.flat().sort((a, b) => b.timestamp - a.timestamp)
                return times.flat()
            } else {
                const emptyArray = []
                return emptyArray
            }
        default :
            return state
    }
}