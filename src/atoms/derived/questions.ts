import { atom } from 'jotai';
import { Question, QuestionType } from '../../types';
import { replaceAtIndex } from '../../utils';
import { questionsAtom } from '../questions';
import { currentCategoryAtom, currentCategoryPageAtom } from './categories';

export const currentCategoryQuestionsAtom = atom((get) => {
  const currentCategory = get(currentCategoryAtom);
  const questions = get(questionsAtom);

  const categoryQuestions = questions.filter((question) => question.categoryId === currentCategory.id);

  return categoryQuestions;
});

export const currentQuestionAtom = atom((get) => {
  const currentCategoryQuestions = get(currentCategoryQuestionsAtom);
  const currentCategory = get(currentCategoryAtom);

  if (currentCategoryQuestions.length > 0) {
    const index = currentCategory.page ? currentCategory.page : 0;

    return currentCategoryQuestions[index];
  } else {
    return undefined;
  }
});

export const currentQuestionSelectedAnwerIdAtom = atom(
  (get) => {
    const currentQuestion = get(currentQuestionAtom);

    if (currentQuestion?.type === QuestionType.Simple) {
      return currentQuestion.selectedAnswerId;
    } else {
      return undefined;
    }
  },
  (get, set, value: string) => {
    const questions = get(questionsAtom);
    const currentQuestion = get(currentQuestionAtom);

    if (currentQuestion && currentQuestion.type === QuestionType.Simple) {
      const index = questions.findIndex((question) => question.id === currentQuestion.id);

      set(questionsAtom, replaceAtIndex(questions, index, { ...currentQuestion, selectedAnswerId: value } as Question));
    }
  }
);

export const currentQuestionSelectedAnwerIdsAtom = atom(
  (get) => {
    const currentQuestion = get(currentQuestionAtom);

    if (currentQuestion?.type === QuestionType.MultipleChoice) {
      return currentQuestion.selectedAnswerIds;
    } else {
      return undefined;
    }
  },
  (get, set, value: string[]) => {
    const questions = get(questionsAtom);
    const currentQuestion = get(currentQuestionAtom);

    if (currentQuestion && currentQuestion.type === QuestionType.MultipleChoice) {
      const index = questions.findIndex((q) => q.id === currentQuestion.id);

      set(
        questionsAtom,
        replaceAtIndex(questions, index, { ...currentQuestion, selectedAnswerIds: value } as Question)
      );
    }
  }
);

export const isLastQuestionOfCurrentCategoryAtom = atom((get) => {
  const currentCategoryPage = get(currentCategoryPageAtom);
  const currentCategoryQuestions = get(currentCategoryQuestionsAtom);

  return currentCategoryQuestions.length - 1 === currentCategoryPage;
});
