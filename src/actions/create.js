export const CREATE = 'CREATE'
export const ON_PAGE = 'ON_PAGE'

export function createUser (user) {
    return {
        type: CREATE,
        user
    }
}

export function routing (page) {
    return {
        type: ON_PAGE,
        page
    }
}