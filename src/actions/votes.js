import { saveQuestionAnswer } from '../utils/data'
export const PUSH_VOTE_TO_USER = 'PUSH_VOTE_TO_USER'

function voteHandle (answer) {
    return {
        type: PUSH_VOTE_TO_USER,
        answer
    }
}

export function votes (answer) {
    return (dispatch) => {
        return Promise.all([
            saveQuestionAnswer(answer)
        ])
        .then(() => {
            dispatch(voteHandle(answer))
        })
    }
}