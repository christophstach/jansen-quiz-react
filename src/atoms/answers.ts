import { atom } from 'jotai';
import { Answer } from '../types';

const answers: Answer[] = [
  {
    id: '1.1.1.1',
    questionId: '1.1.1',
    text: 'Anwort 1.1.1.1',
  },
  {
    id: '1.1.1.2',
    questionId: '1.1.1',
    text: 'Anwort 1.1.1.2',
  },
  {
    id: '1.1.1.3',
    questionId: '1.1.1',
    text: 'Anwort 1.1.1.3',
  },

  //

  {
    id: '1.1.2.1',
    questionId: '1.1.2',
    text: 'Anwort 1.1.2.1',
  },
  {
    id: '1.1.2.2',
    questionId: '1.1.2',
    text: 'Anwort 1.1.2.2',
  },
  {
    id: '1.1.2.3',
    questionId: '1.1.2',
    text: 'Anwort 1.1.2.3',
  },

  //

  {
    id: '1.1.3.1',
    questionId: '1.1.3',
    text: 'Anwort 1.1.3.1',
  },
  {
    id: '1.1.3.2',
    questionId: '1.1.3',
    text: 'Anwort 1.1.3.2',
  },
  {
    id: '1.1.3.3',
    questionId: '1.1.3',
    text: 'Anwort 1.1.3.3',
  },


  //

  {
    id: '1.2.1.1',
    questionId: '1.2.1',
    text: 'Anwort 1.2.1.1',
  },

  {
    id: '1.2.2.1',
    questionId: '1.2.2',
    text: 'Anwort 1.2.2.1',
  },

  {
    id: '1.2.3.1',
    questionId: '1.2.3',
    text: 'Anwort 1.2.3.1',
  },

  //

  {
    id: '1.3.1.1',
    questionId: '1.3.1',
    text: 'Anwort 1.3.1.1',
  },

  {
    id: '1.3.2.1',
    questionId: '1.3.2',
    text: 'Anwort 1.3.2.1',
  },

  {
    id: '1.3.3.1',
    questionId: '1.3.3',
    text: 'Anwort 1.3.3.1',
  },
];

export const answersAtom = atom(answers);
