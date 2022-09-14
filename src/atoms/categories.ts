import { atomWithStorage } from 'jotai/utils';
import { Category } from '../types';

const categories: Category[] = [
  {
    id: '0',
    text: 'Hallo, Andreas hier 👋 Herzlich willkommen im Finanz-Quiz.',
    active: true,
  },

  {
    id: '1',
    title: 'Start',
    text: 'Welches dieser Ziele steht bei dir im Fokus?',
    parentId: '0',
  },

  {
    id: '1.1',
    title: 'Meine Ausgaben senken',
    parentId: '1',
  },
  {
    id: '1.2',
    title: 'Mein Vermögen aufbauen',
    parentId: '1',
  },
  {
    id: '1.3',
    title: 'Absicherung für mich und meine Familie',
    parentId: '1',
  },
];

export const categoriesAtom = atomWithStorage('categoriesAtom', categories);
