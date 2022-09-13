import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback, useState } from 'react';
import { categoriesAtom } from '../atoms/categories';
import { currentQuestionAnswersAtom } from '../atoms/derived/answers';
import {
  currentCategoryAtom,
  currentCategoryPageAtom,
  currentCategorySelectedSubCategoryIdAtom,
  currentSubCategoriesAtom,
  finalizeNextCategoryAtom,
  nextCategoryAtom,
  parentCategoryAtom,
  selectedSubCategoryAtom,
} from '../atoms/derived/categories';

import {
  canGoNextPageAtom,
  canGoPreviousPageAtom,
  hasNextPageAtom,
  hasPreviousPageAtom,
  pageAtom,
  pageTypeAtom,
} from '../atoms/derived/pages';
import {
  currentCategoryQuestionsAtom,
  currentQuestionAtom,
  currentQuestionSelectedAnwerIdAtom,
  currentQuestionSelectedAnwerIdsAtom,
  isLastQuestionOfCurrentCategoryAtom,
} from '../atoms/derived/questions';

import { questionsAtom } from '../atoms/questions';
import { PageType } from '../types';
import { findById, removeAtIndex, replaceAtIndex } from '../utils';
import { CategoryPage } from './pages/CategoryPage';
import { ErrorPage } from './pages/ErrorPage';
import { FinalizeCategoryPage } from './pages/FinalizeCategoryPage';
import { MailFormPage } from './pages/MailFormPage';
import MultipleChoiceQuestionPage from './pages/MultipleChoiceQuestionPage';
import SimpleQuestionPage from './pages/SimpleQuestionsPage';

import { QuizFooter } from './QuizFooter';

export default function Quiz() {
  const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQuestionSelectedAnswerId, setSelectedAnswerId] = useAtom(currentQuestionSelectedAnwerIdAtom);
  const [currentQuestionSelectedAnswerIds, setSelectedAnswerIds] = useAtom(currentQuestionSelectedAnwerIdsAtom);
  const [currentCategoryPage, setCurrentCategoryPage] = useAtom(currentCategoryPageAtom);
  const [parentCategory, setParentCategory] = useAtom(parentCategoryAtom);
  const [finalizeNextCategory, setFinalizeNextCategory] = useState(finalizeNextCategoryAtom);
  const [nextCategory, setNextCategory] = useAtom(nextCategoryAtom);
  const [currentCategorySelectedSubCategoryId, setCurrentCategorySelectedSubCategoryId] = useAtom(currentCategorySelectedSubCategoryIdAtom);
  const selectedSubCategoryCallback = useAtomCallback(useCallback((get) => get(selectedSubCategoryAtom), []));

  const pageType = useAtomValue(pageTypeAtom);
  const currentSubCategories = useAtomValue(currentSubCategoriesAtom);
  const page = useAtomValue(pageAtom);
  const isLastQuestionOfCurrentCategory = useAtomValue(isLastQuestionOfCurrentCategoryAtom);
  const selectedSubCategory = useAtomValue(selectedSubCategoryAtom);

  const currentQuestion = useAtomValue(currentQuestionAtom);
  const currentCategoryQuestions = useAtomValue(currentCategoryQuestionsAtom);
  const currentQuestionAnswers = useAtomValue(currentQuestionAnswersAtom);
  const hasPreviousPage = useAtomValue(hasPreviousPageAtom);
  const hasNextPage = useAtomValue(hasNextPageAtom);
  const canGoPreviousPage = useAtomValue(canGoPreviousPageAtom);
  const canGoNextPage = useAtomValue(canGoNextPageAtom);

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);

  /*function handlePrevivousPage(): void {
    if (currentCategoryPage! > 0) {
      setCurrentCategoryPage(currentCategoryPage! - 1);

      if (currentCategoryPage >= currentCategoryQuestions.length) {
        const parentCategory = findById(categories, currentCategory.parentId)!;

        setParentCategory({
          ...parentCategory,
          finalizedSubCategories:
            parentCategory.finalizedSubCategories!.length === 1
              ? undefined
              : removeAtIndex(
                  parentCategory.finalizedSubCategories!,
                  parentCategory.finalizedSubCategories!.length - 1
                ),
        });
      }
    } else {
      const parentCategory = findById(categories, currentCategory.parentId)!;

      setCurrentCategory(parentCategory);
    }
  }*/

  /*function handleNextPage(): void {
    if (
      pageType === PageType.SimpleQuestion ||
      pageType === PageType.MultipleChoiceQuestion ||
      pageType === PageType.FinalizeCategory
    ) {
      if (isLastQuestionOfCurrentCategory) {
        setParentCategory({
          ...parentCategory!,
          finalizedSubCategories: parentCategory!.finalizedSubCategories
            ? [...parentCategory!.finalizedSubCategories, currentCategory.id]
            : [currentCategory.id],
        });
      } else if (currentCategoryPage >= currentCategoryQuestions.length) {
        if(nextCategory?.hasInterest) {
          setCurrentCategory(nextCategory);
        } else {
          setParentCategory({
            ...parentCategory!,
            finalizedSubCategories: parentCategory!.finalizedSubCategories
              ? [...parentCategory!.finalizedSubCategories, nextCategory!.id]
              : [nextCategory!.id],
          });
        }
      }
    }

    setCurrentCategoryPage(currentCategoryPage! + 1);
  }*/

  function handlePrevivousPage(): void {
    switch (pageType) {
      case PageType.Category:
        setCurrentCategorySelectedSubCategoryId(currentCategory.id);
        setCurrentCategory(parentCategory!);

        break;

      case PageType.SimpleQuestion:
      case PageType.MultipleChoiceQuestion:
        if (currentCategory.page) {
          setCurrentCategoryPage(currentCategoryPage - 1);
        } else {
          setCurrentCategorySelectedSubCategoryId(currentCategory.id);
          setCurrentCategory(parentCategory!);
        }

        break;

      case PageType.FinalizeCategory:
        setCurrentCategoryPage(currentCategoryPage - 1);
        break;

      case PageType.MailForm:
        break;

      default:
        alert('Not valid PageType!');
    }
  }

  async function handleNextPage(): Promise<void> {
    switch (pageType) {
      case PageType.Category:
        setCurrentCategory((await selectedSubCategoryCallback())!);
        setCurrentCategorySelectedSubCategoryId(undefined);
        break;

      case PageType.SimpleQuestion:
      case PageType.MultipleChoiceQuestion:
        setCurrentCategoryPage(currentCategoryPage! + 1);
        break;

      case PageType.FinalizeCategory:
        setCurrentCategoryPage(currentCategoryPage! + 1);
        break;

      case PageType.MailForm:
        break;

      default:
        alert('Not valid PageType!');
    }
  }

  function handleResetQuiz(): void {
    if (confirm('Willst du wirklich von vorne beginnen?')) {
      setCategories(RESET);
      setQuestions(RESET);
    }
  }

  function handleSubCategorySelected(subCategoryId: string): void {
    setCurrentCategorySelectedSubCategoryId(subCategoryId);
    handleNextPage();
  }

  function handleAnswerSelected(answerId: string): void {
    setSelectedAnswerId(answerId);
    handleNextPage();
  }

  function handleAnswersSelected(answerIds: string[]): void {
    setSelectedAnswerIds(answerIds);
  }

  function handleContinueWithNextCategoryValueChange(value: boolean): void {
    if (nextCategory) {
      setNextCategory({ ...nextCategory, hasInterest: value });
    }
  }

  const pageTypes = {
    [PageType.Category]: (
      <CategoryPage
        category={currentCategory}
        subCategories={currentSubCategories}
        selectedSubCategory={selectedSubCategory}
        onSubCategorySelected={handleSubCategorySelected}
      />
    ),
    [PageType.SimpleQuestion]: (
      <SimpleQuestionPage
        question={currentQuestion!}
        answers={currentQuestionAnswers}
        selectedAnswerId={currentQuestionSelectedAnswerId}
        onAnswerSelected={handleAnswerSelected}
      />
    ),
    [PageType.MultipleChoiceQuestion]: (
      <MultipleChoiceQuestionPage
        question={currentQuestion!}
        answers={currentQuestionAnswers}
        selectedAnswerIds={currentQuestionSelectedAnswerIds}
        onAnswersSelected={handleAnswersSelected}
      />
    ),
    [PageType.FinalizeCategory]: (
      <FinalizeCategoryPage
        nextCategory={nextCategory!}
        defaultValue={nextCategory?.hasInterest}
        onContinueWithNextCategoryValueChange={handleContinueWithNextCategoryValueChange}
      />
    ),
    [PageType.MailForm]: <MailFormPage />,
    [PageType.Error]: <ErrorPage />,
  };

  return (
    <div className="tw-p-10 tw-min-h-full">
      <div className="tw-shadow-quiz tw-flex tw-flex-col tw-max-w-[960px] tw-mx-auto">
        <div className="tw-flex tw-justify-between tw-pt-3">
          <div className="tw-bg-jansen-purple tw-text-white tw-p-3 -tw-ml-3">Seite {page + 1}</div>

          <div className="tw-bg-jansen-yellow tw-text-white tw-p-3 -tw-mr-3">Zu 100% für 0 Euro</div>
        </div>
        currentCategory: <pre className="tw-text-xs">{JSON.stringify(currentCategory, null, 2)}</pre>
        nextCategory: <pre className="tw-text-xs">{JSON.stringify(nextCategory, null, 2)}</pre>
        parentCategory: <pre className="tw-text-xs">{JSON.stringify(parentCategory, null, 2)}</pre>
        currentCategorySelectedSubCategoryId: <pre className="tw-text-xs">{JSON.stringify(currentCategorySelectedSubCategoryId, null, 2)}</pre>
        selectedSubCategory: <pre className="tw-text-xs">{JSON.stringify(selectedSubCategory, null, 2)}</pre>
        isLastQuestionOfCurrentCategory:{' '}
        <pre className="tw-text-xs">{JSON.stringify(isLastQuestionOfCurrentCategory, null, 2)}</pre>
        currentCategoryPage: <pre className="tw-text-xs tw-hidden">{JSON.stringify(currentCategoryPage, null, 2)}</pre>
        questions: <pre className="tw-text-xs tw-hidden">{JSON.stringify(questions, null, 2)}</pre>
        currentCategoryQuestions:{' '}
        <pre className="tw-text-xs tw-hidden">{JSON.stringify(currentCategoryQuestions, null, 2)}</pre>
        currentQuestion: <pre className="tw-text-xs">{JSON.stringify(currentQuestion, null, 2)}</pre>
        {emailSent ? (
          <div className="tw-pb-10 tw-px-10">
            <div className="tw-p-10">
              <h1 className="tw-text-jansen-purple tw-font-bold tw-text-2xl tw-text-center">
                Deine Auswertung ist auf dem Weg du wirst weitergeleitet...
              </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="tw-pb-10 tw-px-10">{pageTypes[pageType]}</div>

            <QuizFooter
              previousButtonEnabled={canGoPreviousPage}
              nextButtonEnabled={canGoNextPage}
              onPreviousPage={handlePrevivousPage}
              onNextPage={handleNextPage}
              onReset={handleResetQuiz}
            />
          </>
        )}
      </div>
    </div>
  );
}
