import { UNANSWERED } from '../actions/unanswered'
import { FORMAT } from '../actions/format'

export default function unanswered (state=[], action) {
    switch(action.type) {
        case UNANSWERED : 
            if (action.questionList !== null) {
                //Getting the relevant user
                let currentUserAnswers = action.userList.filter(x => x.id === action.user)
                if (currentUserAnswers[0] !== undefined) {

                //Ids of users answered questions
                let userAnsList = Object.keys(currentUserAnswers[0].answers)

                //Remove the default option from user answered list
                //const userAnsListPop = userAnsList.filter(x => x !== "123")

                let newQuestionList = []
                const questionValues = action.questionList.map(x => Object.values(x)).flat()
                //Returns the objects of unanswered questions and updates state
                let notAnswered = userAnsList.map(y => {   
                    if (newQuestionList.length === 0) {
                        return newQuestionList = questionValues.filter(x => x.id !== y)
                    } else {
                        return newQuestionList = newQuestionList.filter(x => x.id !== y)
                    }
                })
                let number = notAnswered.length - 1
                //Returns array of not answered questions
                //Ordering by timestamp
                const times = notAnswered[number].sort((a, b) => b.timestamp - a.timestamp)
                return times.flat()         
                }
            } else {
                return state = []
            }
            break;
        case FORMAT :
            let oldList = [...action.question, ...state]
            return oldList        
        default :
            return state
    }
}