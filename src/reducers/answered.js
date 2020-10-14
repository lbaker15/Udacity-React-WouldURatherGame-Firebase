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
                const times = a.flat().map(x => x.timestamp)
                const ordered = times.sort((a, b) => b - a)     
                const orderedAnswered = ordered.map(x => {
                    return a.flat().filter(y => y.timestamp === x)
                })
                 return orderedAnswered.flat()

            } else {
                const emptyArray = []
                return emptyArray
            }
        default :
            return state
    }
}