import { atom } from 'jotai';
import { CategoryPage, FinalizeCategoryPage, PageType, QuestionType } from '../../types';
import { findById } from '../../utils';
import { categoriesAtom } from '../categories';
import { pagesAtom } from '../pages';
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
  const categories = get(categoriesAtom);
  const pages = get(pagesAtom);
  const payload: Record<string, string | string[]> = {};

  const startCategoryIds = pages
    .filter((page) => page.type === PageType.Category)
    .map((page) => (page as CategoryPage).currentCategoryId);

  const endCategoryIds = pages
    .filter((page) => page.type === PageType.FinalizeCategory)
    .flatMap((page) => {
      const nextCategory = findById(categories, (page as FinalizeCategoryPage).nextCategoryId);

      if (nextCategory?.hasInterest) {
        return [(page as FinalizeCategoryPage).currentCategoryId, nextCategory.id];
      } else {
        return [(page as FinalizeCategoryPage).currentCategoryId];
      }
    });

  const categoryIds = [...new Set([...startCategoryIds, ...endCategoryIds])];

  answeredQuestions.forEach((question) => {
    if (question.type === QuestionType.Simple) {
      payload[`q${question.id}`] = question.selectedAnswerId!;
    } else if (question.type === QuestionType.MultipleChoice) {
      payload[`q${question.id}`] = question.selectedAnswerIds!;
    }
  });

  return {
    c: categoryIds,
    ...payload,
  };
});
