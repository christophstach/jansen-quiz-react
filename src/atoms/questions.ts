import { atomWithStorage } from 'jotai/utils';
import { Question, QuestionType } from '../types';

const questions: Question[] = [
  {
    id: '1.1.1',
    categoryId: '1.1',
    text: 'Frage 1.1.1',
    type: QuestionType.Simple,
  },
  {
    id: '1.1.2',
    categoryId: '1.1',
    text: 'Frage 1.1.2',
    type: QuestionType.MultipleChoice,
  },
  {
    id: '1.1.3',
    categoryId: '1.1',
    text: 'Frage 1.1.3',
    type: QuestionType.Simple,
  },

  {
    id: '1.2.1',
    categoryId: '1.2',
    text: 'Frage 1.2.1',
    type: QuestionType.Simple,
  },
  {
    id: '1.2.1',
    categoryId: '1.2',
    text: 'Frage 1.2.2',
    type: QuestionType.Simple,
  },

  {
    id: '1.3.1',
    categoryId: '1.3',
    text: 'Frage 1.3.1',
    type: QuestionType.Simple,
  },
  {
    id: '1.3.2',
    categoryId: '1.3',
    text: 'Frage 1.3.2',
    type: QuestionType.Simple,
  },
  {
    id: '1.3.3',
    categoryId: '1.3',
    text: 'Frage 1.3.3',
    type: QuestionType.Simple,
  },
];

export const questionsAtom = atomWithStorage('questionsAtom', questions);
