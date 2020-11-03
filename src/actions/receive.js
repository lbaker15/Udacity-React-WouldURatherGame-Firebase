import firebase from '../firebase'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(users) {
    return {
        type: RECEIVE_DATA,
        users
    }
}

export function getData () {
    return (dispatch) => {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref('items')
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val()
                let newState = []
                for (let item in items) {
                    newState.push({
                        avatarURL: Object.values(items[item])[0].avatarURL,
                        name: Object.values(items[item])[0].name,
                        id: Object.values(items[item])[0].id,
                        answers: Object.values(items[item])[0].answers,
                        questions: Object.values(items[item])[0].questions
                    })
                }
                res(newState)
            })
        })
        .then((users) => {
            dispatch(receiveData(users))
        })
    }
}


export function updateData () {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref('items')
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val()
                let newState = []
                for (let item in items) {
                    //console.log(item, Object.values(items[item])[0] )
                    newState.push({
                        avatarURL: Object.values(items[item])[0].avatarURL,
                        name: Object.values(items[item])[0].name,
                        id: Object.values(items[item])[0].id,
                        answers: Object.values(items[item])[0].answers,
                        questions: Object.values(items[item])[0].questions
                    })
                }
                res(newState)
            })
        })
}

