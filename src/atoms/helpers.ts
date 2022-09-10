import { Question, QuestionType } from '../types';

export function isQuestionTouched(question: Question): boolean {
  if (question?.type === QuestionType.Simple) {
    return question.selectedAnswerId !== undefined;
  } else if (question?.type === QuestionType.MultipleChoice) {
    return question.selectedAnswerIds !== undefined;
  }

  return false;
}


export function isQuestionValid(question: Question): boolean {
  if (question?.type === QuestionType.Simple) {
    return question.selectedAnswerId !== undefined;
  } else if (question?.type === QuestionType.MultipleChoice) {
    if (question.selectedAnswerIds !== undefined) {
      if (question.minAnswers !== undefined && question.maxAnswers !== undefined) {
        return (
          question.selectedAnswerIds.length >= question.minAnswers &&
          question.selectedAnswerIds.length <= question.maxAnswers
        );
      } else if (question.minAnswers !== undefined && question.maxAnswers === undefined) {
        return question.selectedAnswerIds.length >= question.minAnswers;
      } else if (question.minAnswers === undefined && question.maxAnswers !== undefined) {
        return question.selectedAnswerIds.length <= question.maxAnswers;
      }

      return true;
    }
  }

  return false;
}