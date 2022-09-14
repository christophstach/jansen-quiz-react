export type Category = {
  id: string;
  icon?: string;
  active?: boolean;
  title: string;
  text?: string;
  parentId?: string;
  page?: number;
  finalizedSubCategories?: string[];
  hasInterest?: boolean;
  selectedSubCategoryId?: string;
  previousCategoryId?: string;
};

export enum PageType {
  Category = 'CATEGORY',
  FinalizeCategory = 'FINALIZE_CATEGORY',
  SimpleQuestion = 'SIMPLE_QUESTION',
  MultipleChoiceQuestion = 'MULTIPLE_CHOICE_QUESTION',
  Error = 'ERROR',
  MailForm = 'MAIL_FORM',
}

export enum QuestionType {
  Simple = 'SIMPLE',
  MultipleChoice = 'MULTIPLE_CHOICE',
}

export type CategoryPage = {
  type: PageType.Category;
  currentCategoryId: string;
};

export type QuestionPage = {
  type: PageType.SimpleQuestion | PageType.MultipleChoiceQuestion;
  currentQuestionId: string;
};

export type FinalizeCategoryPage = {
  type: PageType.FinalizeCategory;
  currentCategoryId: string;
  nextCategoryId: string;
};

export type Page = CategoryPage | QuestionPage | FinalizeCategoryPage;

export type SimpleQuestion = {
  id: string;
  icon?: string;
  text: string;
  selectedAnswerId?: string;
  type: QuestionType.Simple;
};

export type MultipleChoiceQuestion = {
  id: string;
  icon?: string;
  text: string;
  selectedAnswerIds?: string[];
  type: QuestionType.MultipleChoice;
  minAnswers?: number;
  maxAnswers?: number;
};

export type Question = (SimpleQuestion | MultipleChoiceQuestion) & {
  categoryId: string;
};

export type Answer = {
  id: string;
  questionId: string;
  text: string;
};
