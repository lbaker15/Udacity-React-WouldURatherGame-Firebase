import {getQues} from './questions'
import {getData} from './receive'
import firebase from '../firebase'
import {updateData} from './receive'
export const FORMAT = 'FORMAT'
export const QUES_CREATED = 'QUES_CREATED'


function questionCreated(users) {
  return {
      type: QUES_CREATED,
      users
  }
}

//All to do with create new user
export function formattingEdit (ques, users, questions) {
    return (dispatch) => {
        return Promise.all([
            makeArray(ques, users, questions)
        ])
        .then(() => {
          //Tidy up 
            setTimeout(() => {
              return Promise.all([updateData(), getQues()])
              .then((users) => {
                dispatch(questionCreated(users[0]))
              })
            }, 1000)
        })
    }
}

function makeArray (ques, users, questions) {
    return new Promise((res, rej) => {
        const authedUser = ques.author;
        const formattedQuestion = formatQuestionEdit(ques);

        setTimeout(() => {
          const quesRef = firebase.database().ref('questions');
          const refer = quesRef.push();
          const theKey = refer.key
          const realKey = quesRef.child(formattedQuestion.id)
          realKey.set(formattedQuestion)

          //push to users questions array - you are pushing formattedQuestion.id
          const itemsRef = firebase.database().ref('items')
          const reference = itemsRef.child(authedUser).child(authedUser).child("questions")
          reference.push(formattedQuestion.id)

          res(formattedQuestion)
        }, 500)
    })
}
function formatQuestionEdit ({ optionOneText, optionTwoText, author }) {
    return {
      id: (Math.random() * 100000).toFixed(0),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: {0: "undefined"},
        text: optionOneText,
      },
      optionTwo: {
        votes: {0: "undefined"},
        text: optionTwoText,
      }
    }
  }