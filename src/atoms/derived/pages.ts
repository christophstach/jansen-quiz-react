import { atom } from 'jotai';
import { PageType, QuestionType } from '../../types';
import { treeDepth } from '../../utils';

import { categoriesAtom } from '../categories';
import { isQuestionValid } from '../helpers';
import { currentCategoryAtom, currentCategoryQuestionIndexAtom, isLeafCurrentCategoryAtom } from './categories';
import { currentQuestionAtom,  } from './questions';

export const pageAtom = atom((get) => {
  const currentCategory = get(currentCategoryAtom);
  const categories = get(categoriesAtom);
  const categoryQuestionIndex = get(currentCategoryQuestionIndexAtom);

  if (categoryQuestionIndex !== undefined) {
    return treeDepth(categories, currentCategory) + categoryQuestionIndex;
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

  if (pageType === PageType.Category) {
    return true;
  } else if (pageType === PageType.SimpleQuestion || pageType === PageType.MultipleChoiceQuestion) {
    return isQuestionValid(currentQuestion!);
  }

  return false;
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
    }

    return PageType.Error;
  } else {
    return PageType.Category;
  }
});
