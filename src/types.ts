export type Category = {
  id: string
  icon?: string
  active?: boolean
  title: string
  text?: string
  parentId?: string
  questionIndex?: number
}

export enum PageType {
  Category = 'CATEGORY',
  SimpleQuestion = 'SIMPLE_QUESTION',
  MultipleChoiceQuestion = 'MULTIPLE_CHOICE_QUESTION',
  Error = 'ERROR',
}

export enum QuestionType {
  Simple = 'SIMPLE',
  MultipleChoice = 'MULTIPLE_CHOICE',
}

export interface SimpleQuestion {
  id: string
  icon?: string
  text: string
  selectedAnswerId?: string
  type: QuestionType.Simple
}

export interface MultipleChoiceQuestion {
  id: string
  icon?: string
  text: string
  selectedAnswerIds?: string[]
  type: QuestionType.MultipleChoice
  minAnswers?: number
  maxAnswers?: number
}

export type Question = (SimpleQuestion | MultipleChoiceQuestion) & {
  categoryId: string
}

export type Answer = {
  id: string
  questionId: string
  text: string
}
