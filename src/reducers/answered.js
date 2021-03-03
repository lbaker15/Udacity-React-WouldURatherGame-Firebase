import { ANSWERED } from '../actions/answered'

export default function answered (state=[], action) {
    switch(action.type) {
        case ANSWERED : 
             if (action.questionList !== null) {
                const user = action.answeredQ.filter(x => x.id === action.user)[0].answers
                //Filtering the relevant users answers for the default answer that is set when a user is created
                const withoutDefault = Object.keys(user).filter(x => x !== "123")

                const questionListValues = action.questionList.map(x => Object.values(x)).flat()
                let a = withoutDefault.map(y => { 
                    return questionListValues.filter(x => {
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