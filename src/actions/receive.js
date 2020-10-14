import {getUsers} from '../utils/data'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(users) {
    return {
        type: RECEIVE_DATA,
        users
    }
}

export function getData () {
    return (dispatch) => {
        return Promise.all([
            getUsers()
        ])
        .then((users) => {
            dispatch(receiveData(users))
        })
    }
}