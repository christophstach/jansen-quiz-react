import { atom } from 'jotai';
import { QuestionType } from '../../types';
import { answeredQuestionsAtom } from './questions';

export const formDataAtom = atom((get) => {
  const answeredQuestions = get(answeredQuestionsAtom);
  const formData = new FormData();

  answeredQuestions.forEach((question, i) => {
    if (question.type === QuestionType.Simple) {
      formData.append(`q${question.id}`, question.selectedAnswerId!);
    } else if (question.type === QuestionType.MultipleChoice) {
      question.selectedAnswerIds!.forEach((answerId) => {
        formData.append(`q${question.id}`, answerId);
      });
    }
  });

  return formData;
});

export const payloadAtom = atom((get) => {
  const answeredQuestions = get(answeredQuestionsAtom);
  const payload: Record<string, string | string[]> = {};

  answeredQuestions.forEach((question) => {
    if (question.type === QuestionType.Simple) {
      payload[`q${question.id}`] = question.selectedAnswerId!;
    } else if (question.type === QuestionType.MultipleChoice) {
      payload[`q${question.id}`] = question.selectedAnswerIds!;
    }
  });

  return payload;
});
