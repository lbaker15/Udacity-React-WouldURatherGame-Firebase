import { ON_PAGE } from '../actions/create'

export default function create (state=null, action) {
    switch (action.type) {
        case ON_PAGE :
            console.log(action.page)
            return action.page
        default :
            return state
    }
}