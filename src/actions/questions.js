import firebase from '../firebase'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function getQues () {
    return (dispatch) => {
        new Promise((res, rej) => {
            const itemsRef = firebase.database().ref('questions')
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val()
                let newState = []
                for (let item in items) {
                    newState.push(
                        { [items[item].id]: {
                        author: items[item].author,
                        id: items[item].id,
                        timestamp: items[item].timestamp,
                        optionOne: {
                            text: items[item].optionOne.text,
                            votes: [items[item].optionOne.votes]
                        },
                        optionTwo: {
                            text: items[item].optionTwo.text,
                            votes: [items[item].optionTwo.votes]
                        }
                    }})
                }
                res(dispatch(receiveQuestions(newState)))
            })
        })
    }
}

export function updateQues () {
    
}