import { atom } from 'jotai';
import { PageType, QuestionType } from '../../types';
import { treeDepth } from '../../utils';

import { categoriesAtom } from '../categories';
import { isQuestionValid } from '../helpers';
import {
  currentCategoryAtom,
  currentCategoryPageAtom,
  currentCategorySelectedSubCategoryIdAtom,
  hasNextCategoryAtom,
  isLeafCurrentCategoryAtom,
  nextCategoryAtom,
} from './categories';
import { currentCategoryQuestionsAtom, currentQuestionAtom } from './questions';

export const pageAtom = atom((get) => {
  const currentCategory = get(currentCategoryAtom);
  const categories = get(categoriesAtom);
  const currentCategoryPage = get(currentCategoryPageAtom);

  if (currentCategoryPage !== undefined) {
    return treeDepth(categories, currentCategory) + currentCategoryPage;
  }

  return treeDepth(categories, currentCategory);
});

export const hasPreviousPageAtom = atom((get) => {
  const page = get(pageAtom);

  return page > 0;
});

export const hasNextPageAtom = atom((get) => {
  return true;
});

export const canGoPreviousPageAtom = atom((get) => {
  const hasPreviousPage = get(hasPreviousPageAtom);

  return hasPreviousPage;
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
      return isQuestionValid(currentQuestion!);

    case PageType.FinalizeCategory:
      const nextCategory = get(nextCategoryAtom);

      return nextCategory?.hasInterest !== undefined;

    case PageType.MailForm:

      return false
      break;

    default:
      alert('Not a valid PageType!');
      return false;
  }

  /*if (pageType === PageType.Category) {
    return true;
  } else if (pageType === PageType.SimpleQuestion || pageType === PageType.MultipleChoiceQuestion) {
    return isQuestionValid(currentQuestion!);
  } else if (pageType === PageType.FinalizeCategory) {
    const nextCategory = get(nextCategoryAtom);

    return nextCategory?.hasInterest !== undefined;
  }*/
});

export const pageTypeAtom = atom((get) => {
  const isLeafCurrentategory = get(isLeafCurrentCategoryAtom);

  if (isLeafCurrentategory) {
    const currentQuestion = get(currentQuestionAtom);

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
        return PageType.MailForm;
      }
    }

    return PageType.Error;
  } else {
    return PageType.Category;
  }
});
