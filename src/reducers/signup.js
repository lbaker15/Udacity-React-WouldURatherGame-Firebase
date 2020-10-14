import { SIGNIN, SIGNOUT } from '../actions/signup'

export default function signup (state = null, action) {
    switch (action.type) {
        case SIGNIN :
            return action.user
        case SIGNOUT :
            return action.user
        default :
            return state
    }
}