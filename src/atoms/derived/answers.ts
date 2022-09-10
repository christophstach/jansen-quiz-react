import { atom } from 'jotai';
import { answersAtom } from '../answers';
import { currentQuestionAtom as currentQuestionAtom } from './questions';

export const currentQuestionAnswersAtom = atom((get) => {
  const answers = get(answersAtom);
  const currentQuestion = get(currentQuestionAtom);

  if (currentQuestion) {
    return answers.filter((answer) => answer.questionId === currentQuestion.id);
  } else {
    return [];
  }
});
