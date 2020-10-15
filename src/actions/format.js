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

export function formattingEdit (ques, users, questions) {
    return (dispatch) => {
        return Promise.all([
            makeArray(ques, users, questions)
        ])
        .then((ques) => {
            //console.log(ques, users)
            dispatch(format(ques))
        })
    }
}

function makeArray (ques, users, questions) {
    return new Promise((res, rej) => {
        const authedUser = ques.author;
        const formattedQuestion = formatQuestionEdit(ques);
        console.log({...users[0][authedUser]})
    
        setTimeout(() => {
          questions = {
            ...questions[0],
            [formattedQuestion.id]: formattedQuestion
          }
          
          users = {
            ...users[0],
            [authedUser]: {
                ...users[0][authedUser],
                questions: users[0][authedUser].questions.concat([formattedQuestion.id])
            }
          }
          res(formattedQuestion)
        }, 500)
    })
}
function formatQuestionEdit ({ optionOneText, optionTwoText, author }) {
    return {
      id: "XXXX",
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }