import {saveQuestion} from '../utils/data'
export const FORMAT = 'FORMAT'

function format(question) {
    return {
        type: FORMAT,
        question
    }
}

export function formatting (question) {
    return (dispatch) => {
        return Promise.all([
            saveQuestion(question)
        ])
        .then((ques) => {
            dispatch(format(ques))
        })
    }
}