import { atom } from 'jotai';
import { PageType, QuestionType } from '../../types';
import { categoriesAtom } from '../categories';
import { isQuestionValid } from '../helpers';
import { pagesAtom } from '../pages';
import { questionsAtom } from '../questions';
import {
  currentCategoryAtom,
  currentCategoryPageAtom,
  currentCategorySelectedSubCategoryIdAtom,
  currentCategorySiblingsAtom,
  hasNextCategoryAtom,
  isLeafCurrentCategoryAtom,
  nextCategoryAtom,
} from './categories';
import { currentCategoryQuestionsAtom, currentQuestionAtom } from './questions';

export const pageAtom = atom((get) => {
  const pages = get(pagesAtom);

  return pages.length + 1;
});

export const maxPagesAtom = atom((get) => {
  const maxTreeDepth = 2;
  const categories = get(categoriesAtom);
  const questions = get(questionsAtom);
  const currentCategory = get(currentCategoryAtom);

  const currentCategorySiblings = get(currentCategorySiblingsAtom);
  const currentCategoryChildren = categories.filter((category) => category.parentId === currentCategory.id);

  const categoriesWithInterest = categories.filter(
    (category) => category.hasInterest || category.hasInterest === undefined
  );
  const categoriesWithInterestIds = categoriesWithInterest.map((category) => category.id);
  const categoriesWithInterestQuestions = questions.filter((question) =>
    categoriesWithInterestIds.includes(question.categoryId)
  );

  return (
    maxTreeDepth +
    currentCategorySiblings.length +
    categoriesWithInterestQuestions.length +
    Math.max(currentCategoryChildren.length - 1, 0) +
    1
  );
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
