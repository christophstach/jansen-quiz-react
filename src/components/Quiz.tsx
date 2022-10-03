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
  nextCategoryAtom,
  parentCategoryAtom,
  selectedSubCategoryAtom,
} from '../atoms/derived/categories';
import { payloadAtom } from '../atoms/derived/data';

import { canGoNextPageAtom, canGoPreviousPageAtom, maxPagesAtom, pageTypeAtom, pageAtom } from '../atoms/derived/pages';
import {
  currentQuestionAtom,
  currentQuestionSelectedAnwerIdAtom,
  currentQuestionSelectedAnwerIdsAtom,
  isLastQuestionOfCurrentCategoryAtom,
} from '../atoms/derived/questions';
import { mailFormAtom } from '../atoms/mailForm';
import { finalQuestionPageAtom, pagesAtom } from '../atoms/pages';

import { questionsAtom } from '../atoms/questions';
import { config } from '../config';
import { PageType } from '../types';
import { findById, payloadToEncodedLink, removeAtIndex, replaceAtIndex } from '../utils';
import { CategoryPage } from './pages/CategoryPage';
import { ErrorPage } from './pages/ErrorPage';
import { FinalizeCategoryPage } from './pages/FinalizeCategoryPage';
import { MailFormPage } from './pages/MailFormPage';
import MultipleChoiceQuestionPage from './pages/MultipleChoiceQuestionPage';
import SimpleQuestionPage from './pages/SimpleQuestionsPage';

import { QuizFooter } from './QuizFooter';
import { ProgressBar } from './ProgressBar';
import { PageIndicator } from './PageIndicator';

export default function Quiz() {
  const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQuestionSelectedAnswerId, setSelectedAnswerId] = useAtom(currentQuestionSelectedAnwerIdAtom);
  const [currentQuestionSelectedAnswerIds, setSelectedAnswerIds] = useAtom(currentQuestionSelectedAnwerIdsAtom);
  const [currentCategoryPage, setCurrentCategoryPage] = useAtom(currentCategoryPageAtom);
  const [parentCategory, setParentCategory] = useAtom(parentCategoryAtom);
  const [nextCategory, setNextCategory] = useAtom(nextCategoryAtom);
  const [mailForm, setMailForm] = useAtom(mailFormAtom);
  const [pages, setPages] = useAtom(pagesAtom);
  const [finalQuestionPage, setFinalQuestionPage] = useAtom(finalQuestionPageAtom);

  const setCurrentCategorySelectedSubCategoryId = useSetAtom(currentCategorySelectedSubCategoryIdAtom);

  const selectedSubCategoryCallback = useAtomCallback(useCallback((get) => get(selectedSubCategoryAtom), []));
  const nextCategoryCallback = useAtomCallback(useCallback((get) => get(nextCategoryAtom), []));
  const categoriesCallback = useAtomCallback(useCallback((get) => get(categoriesAtom), []));

  const pageType = useAtomValue(pageTypeAtom);
  const currentSubCategories = useAtomValue(currentSubCategoriesAtom);
  const page = useAtomValue(pageAtom);
  const maxPages = useAtomValue(maxPagesAtom);
  const isLastQuestionOfCurrentCategory = useAtomValue(isLastQuestionOfCurrentCategoryAtom);
  const selectedSubCategory = useAtomValue(selectedSubCategoryAtom);
  const currentQuestion = useAtomValue(currentQuestionAtom);
  const currentQuestionAnswers = useAtomValue(currentQuestionAnswersAtom);
  const canGoPreviousPage = useAtomValue(canGoPreviousPageAtom);
  const canGoNextPage = useAtomValue(canGoNextPageAtom);
  const payload = useAtomValue(payloadAtom);

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);

  async function handlePrevivousPage(): Promise<void> {
    const previousPage = pages[pages.length - 1];

    setPages(removeAtIndex(pages, pages.length - 1));

    switch (previousPage.type) {
      case PageType.Category:
        {
          const pageCurrentCategory = findById(categories, previousPage.currentCategoryId)!;
          setCurrentCategory(pageCurrentCategory);
        }
        break;
      case PageType.SimpleQuestion:
      case PageType.MultipleChoiceQuestion:
        {
          const pageCurrentQuestion = findById(questions, previousPage.currentQuestionId)!;
          const pageCurrentCategory = findById(categories, pageCurrentQuestion.categoryId)!;

          const pageCategoryQuestions = questions.filter(
            (question) => question.categoryId === pageCurrentQuestion.categoryId
          );
          const pageCategoryQuestionIndex = pageCategoryQuestions.findIndex(
            (question) => question.id === pageCurrentQuestion.id
          );

          setCurrentCategory({
            ...pageCurrentCategory,
            page: pageCategoryQuestionIndex,
          });

          const isLastCategoryQuestion =
            pageCategoryQuestions[pageCategoryQuestions.length - 1].id === pageCurrentQuestion.id;

          if (isLastCategoryQuestion) {
            const pageParentCategory = findById(categories, pageCurrentCategory.parentId)!;
            const pageParentCategoryIndex = categories.findIndex((category) => category.id === pageParentCategory?.id);

            setCategories(
              replaceAtIndex(await categoriesCallback()!, pageParentCategoryIndex, {
                ...pageParentCategory,
                finalizedSubCategories:
                  pageParentCategory.finalizedSubCategories!.length > 1
                    ? pageParentCategory.finalizedSubCategories?.filter(
                        (categoryId) => categoryId !== pageCurrentCategory.id
                      )
                    : undefined,
              })
            );
          }
        }
        break;
      case PageType.FinalSimpleQuestion:
      case PageType.FinalMultipleChoiceQuestion:
        {
          setFinalQuestionPage(finalQuestionPage - 1);
        }
        break;
      case PageType.FinalizeCategory:
        {
          const pageCurrentCategory = findById(categories, previousPage.currentCategoryId)!;
          const pageParentCategory = findById(categories, pageCurrentCategory.parentId)!;
          const pageParentCategoryIndex = categories.findIndex((category) => category.id === pageParentCategory?.id);

          setCurrentCategory(pageCurrentCategory);

          setCategories(
            replaceAtIndex(await categoriesCallback()!, pageParentCategoryIndex, {
              ...pageParentCategory!,
              finalizedSubCategories: pageParentCategory.finalizedSubCategories?.filter(
                (finalizedCategory) => finalizedCategory !== previousPage.nextCategoryId
              ),
            })
          );
        }
        break;
      default: {
        alert('Not a valid PageType!');
      }
    }

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  async function handleNextPage(): Promise<void> {
    switch (pageType) {
      case PageType.Category:
        {
          setPages([
            ...pages,
            {
              type: pageType,
              currentCategoryId: currentCategory.id,
            },
          ]);

          setCurrentCategory((await selectedSubCategoryCallback())!);
          setCurrentCategorySelectedSubCategoryId(undefined);
        }
        break;

      case PageType.SimpleQuestion:
      case PageType.MultipleChoiceQuestion:
        {
          setPages([
            ...pages,
            {
              type: pageType,
              currentQuestionId: currentQuestion!.id,
            },
          ]);

          setCurrentCategoryPage(currentCategoryPage! + 1);

          if (isLastQuestionOfCurrentCategory) {
            setParentCategory({
              ...parentCategory!,
              finalizedSubCategories: parentCategory!.finalizedSubCategories
                ? [...parentCategory!.finalizedSubCategories, currentCategory!.id]
                : [currentCategory!.id],
            });
          }
        }
        break;

      case PageType.FinalSimpleQuestion:
      case PageType.FinalMultipleChoiceQuestion:
        {
          setPages([
            ...pages,
            {
              type: pageType,
            },
          ]);

          setFinalQuestionPage(finalQuestionPage + 1);
        }
        break;
      case PageType.FinalizeCategory:
        {
          const nextCategory = await nextCategoryCallback();

          setPages([
            ...pages,
            {
              type: pageType,
              currentCategoryId: currentCategory!.id,
              nextCategoryId: nextCategory!.id,
            },
          ]);

          if (nextCategory?.hasInterest) {
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
        break;

      case PageType.MailForm:
        {
        }
        break;

      default: {
        alert('Not valid PageType!');
      }
    }

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function handleResetQuiz(): void {
    if (confirm('Willst du wirklich von vorne beginnen?')) {
      setCategories(RESET);
      setQuestions(RESET);
      setPages(RESET);
      setFinalQuestionPage(RESET);
      setMailForm(RESET);
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

    handleNextPage();
  }

  function handleMailFormChange(firstName: string, email: string) {
    setMailForm({
      firstName,
      email,
    });
  }

  function handleMailFormSubmit(firstName: string, email: string): void {
    setLoading(true);

    const recommendationsLink = `${config.recommendationsLinkPrefix}${payloadToEncodedLink({
      ...payload,
      firstName,
    })}`;

    const json = JSON.stringify({
      ...payload,
      firstName,
      email,
      recommendationsLink,
    });

    fetch(config.subscribeUrl, {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setError(false);
        setLoading(false);
        setEmailSent(true);

        setCategories(RESET);
        setQuestions(RESET);
        setPages(RESET);
        setFinalQuestionPage(RESET);
        setMailForm(RESET);

        window.location.replace(config.forwardlink);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
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
    [PageType.FinalSimpleQuestion]: (
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
    [PageType.FinalMultipleChoiceQuestion]: (
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
    [PageType.MailForm]: (
      <MailFormPage
        firstName={mailForm.firstName}
        email={mailForm.email}
        loading={loading}
        error={error}
        onSubmit={handleMailFormSubmit}
        onChange={handleMailFormChange}
      />
    ),
    [PageType.Error]: <ErrorPage />,
  };

  return (
    <div className="tw-min-h-full">
      <div className="tw-shadow-quiz tw-bg-stone-50 tw-flex tw-flex-col tw-max-w-[960px] tw-mx-auto">
        <div className="tw-flex tw-justify-between tw-pt-3">
          <div className="tw-bg-jansen-purple tw-text-white tw-p-3 -tw-ml-3">
            <PageIndicator pages={pages} />
          </div>

          <div className="tw-bg-jansen-purple tw-text-white tw-p-3 -tw-mr-3 ">Zu 100% für 0 Euro</div>
        </div>

        {emailSent ? (
          <div className="tw-p-5 md:tw-p-10">
            <h1 className="tw-text-jansen-purple tw-font-bold tw-text-2xl tw-text-center">
              Dein Resultat wird berechnet. Du wirst weitergeleitet...
            </h1>
          </div>
        ) : (
          <>
            {currentCategory.parentId && (
              <div className="tw-px-5 tw-pt-5 md:tw-px-10 md:tw-pt-10">
                <ProgressBar page={page} maxPages={maxPages} />
              </div>
            )}

            <div className="tw-p-5 md:tw-p-10">{pageTypes[pageType]}</div>

            {currentCategory.parentId && pageType !== PageType.MailForm && (
              <QuizFooter
                previousButtonEnabled={canGoPreviousPage}
                nextButtonEnabled={canGoNextPage}
                onPreviousPage={handlePrevivousPage}
                onNextPage={handleNextPage}
                onReset={handleResetQuiz}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
