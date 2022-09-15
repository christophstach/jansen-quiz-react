import { atom } from 'jotai';
import { PageType, QuestionType } from '../../types';
import { categoriesAtom } from '../categories';
import { isQuestionValid } from '../helpers';
import { finalQuestionPageAtom, pagesAtom } from '../pages';
import {
  currentCategoryAtom,
  currentCategoryPageAtom,
  currentCategorySelectedSubCategoryIdAtom,
  hasNextCategoryAtom,
  isLeafCurrentCategoryAtom,
  nextCategoryAtom,
} from './categories';
import { currentCategoryQuestionsAtom, currentQuestionAtom, finalQuestionsAtom } from './questions';

export const pageAtom = atom((get) => {
  const pages = get(pagesAtom);
  const pageType = get(pageTypeAtom);
  const categories = get(categoriesAtom);
  const currentCategory = get(currentCategoryAtom);

  if (pageType === PageType.Category) {
    return -1;
  } else if (pageType === PageType.FinalizeCategory) {
    return -2;
  } else if (pageType === PageType.MailForm) {
    return -3;
  } else if (pageType === PageType.Error) {
    return -4;
  } else if (pageType === PageType.SimpleQuestion || pageType === PageType.MultipleChoiceQuestion) {
    return currentCategory.page ? currentCategory.page : 0;
  }

  return -4;
});

export const maxPagesAtom = atom((get) => {
  const currentCategoryQuestions = get(currentCategoryQuestionsAtom);

  return currentCategoryQuestions.length;
});

export const canGoPreviousPageAtom = atom((get) => {
  const pages = get(pagesAtom);

  return pages.length > 0;
});

export const canGoNextPageAtom = atom((get) => {
  const pageType = get(pageTypeAtom);
  const currentQuestion = get(currentQuestionAtom);
  const currentCategorySelectedSubCategoryId = get(currentCategorySelectedSubCategoryIdAtom);

  switch (pageType) {
    case PageType.Category:
      return !!currentCategorySelectedSubCategoryId;

    case PageType.SimpleQuestion:
    case PageType.MultipleChoiceQuestion:
    case PageType.FinalSimpleQuestion:
    case PageType.FinalMultipleChoiceQuestion:
      return isQuestionValid(currentQuestion!);

    case PageType.FinalizeCategory:
      const nextCategory = get(nextCategoryAtom);

      return nextCategory?.hasInterest !== undefined;

    case PageType.MailForm:
      return false;

    default:
      alert('Not a valid PageType!');
      return false;
  }
});

export const pageTypeAtom = atom((get) => {
  const isLeafCurrentategory = get(isLeafCurrentCategoryAtom);

  if (isLeafCurrentategory) {
    const currentCategoryQuestions = get(currentCategoryQuestionsAtom);
    const currentCategory = get(currentCategoryAtom);

    const index = currentCategory.page ? currentCategory.page : 0;
    const currentQuestion = currentCategoryQuestions.length > 0 ? currentCategoryQuestions[index] : undefined;

    if (currentQuestion) {
      if (currentQuestion.type === QuestionType.Simple) {
        return PageType.SimpleQuestion;
      } else if (currentQuestion.type === QuestionType.MultipleChoice) {
        return PageType.MultipleChoiceQuestion;
      }
    } else {
      const hasNextCategory = get(hasNextCategoryAtom);

      if (hasNextCategory) {
        const currentCategoryPage = get(currentCategoryPageAtom);
        const currentCategoryQuestions = get(currentCategoryQuestionsAtom);

        if (currentCategoryPage === currentCategoryQuestions.length) {
          return PageType.FinalizeCategory;
        }
      } else {
        const finalQuestions = get(finalQuestionsAtom);
        const finalQuestionPage = get(finalQuestionPageAtom);

        if (finalQuestions.length > 0) {
          const finalQuestion = finalQuestions[finalQuestionPage];

          if (finalQuestion) {
            if (finalQuestion.type === QuestionType.Simple) {
              return PageType.FinalSimpleQuestion;
            } else if (finalQuestion.type === QuestionType.MultipleChoice) {
              return PageType.FinalMultipleChoiceQuestion;
            }
          }
        }

        return PageType.MailForm;
      }
    }

    return PageType.Error;
  } else {
    return PageType.Category;
  }
});
