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

export interface SimpleQuestion {
  id: string;
  icon?: string;
  text: string;
  selectedAnswerId?: string;
  type: QuestionType.Simple;
}

export interface MultipleChoiceQuestion {
  id: string;
  icon?: string;
  text: string;
  selectedAnswerIds?: string[];
  type: QuestionType.MultipleChoice;
  minAnswers?: number;
  maxAnswers?: number;
}

export type Question = (SimpleQuestion | MultipleChoiceQuestion) & {
  categoryId: string;
};

export type Answer = {
  id: string;
  questionId: string;
  text: string;
};
