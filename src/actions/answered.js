export const ANSWERED = 'ANSWERED'

export function answeredQuestions (questionList, user, answeredQ) {
    return {
        type: ANSWERED,
        questionList, user, answeredQ
    }
}