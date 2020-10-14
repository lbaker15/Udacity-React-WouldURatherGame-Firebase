export const UNANSWERED = 'UNANSWERED'

export function unansweredQuestions (questionList, user, answeredQ) {
    return {
        type: UNANSWERED,
        questionList, user, answeredQ
    }
}