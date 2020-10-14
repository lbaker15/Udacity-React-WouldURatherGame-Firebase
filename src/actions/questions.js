import {getQuestions} from '../utils/data'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function getQues () {
    return (dispatch) => {
        return Promise.all([
            getQuestions()
        ])
        .then((ques) => {
            dispatch(receiveQuestions(ques))
        })
    }
}