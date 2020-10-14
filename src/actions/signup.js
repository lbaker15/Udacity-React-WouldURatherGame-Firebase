export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'

export function signIn (user) {
    return {
        type: SIGNIN,
        user
    }
}

export function signOut (user) {
    return {
        type: SIGNOUT,
        user
    }
}