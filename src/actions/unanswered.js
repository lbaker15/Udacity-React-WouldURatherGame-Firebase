export const UNANSWERED = 'UNANSWERED'

export function unansweredQuestions (questionList, user, userList) {
    return {
        type: UNANSWERED,
        questionList, user, userList
    }
}