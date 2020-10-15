export const CREATE = 'CREATE'

export function createUser (user) {
    return {
        type: CREATE,
        user
    }
}