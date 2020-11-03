//import { saveQuestionAnswer } from '../utils/data'
import firebase from '../firebase'
import {updateData} from './receive'
import {getQues} from './questions'
export const PUSH_VOTE_TO_USER = 'PUSH_VOTE_TO_USER'

function saveQuestionAns(answer) {
    const itemsRef = firebase.database().ref('items')
    const reference = itemsRef.child(answer.authedUser).child(answer.authedUser).child("answers")
    const newRef = reference.push();
    const newKey = newRef.key
    const realRef =  reference.child(answer.qid)
    realRef.set(answer.answer)

    const itemsRefTwo = firebase.database().ref('questions') 
    const referenceTwo = itemsRefTwo.child(answer.qid).child(answer.answer).child("votes")
    const newRefTwo = referenceTwo.push();
    const newKeyTwo = newRefTwo.key
    const realRefTwo =  referenceTwo.child(answer.authedUser)
    realRefTwo.set(answer.answer)     
}

function voteHandle (answer) {
    return {
        type: PUSH_VOTE_TO_USER,
        answer
    }
}

export function votes (answer) {
    return (dispatch) => {
        return Promise.all([saveQuestionAns(answer)])
        .then(() => getQues())
        .then(() => updateData())
        .then((data) => dispatch(voteHandle(data)))
    }
}


