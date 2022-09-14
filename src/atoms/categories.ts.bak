import { atomWithStorage } from 'jotai/utils';
import { Category } from '../types';

const categories: Category[] = [
  {
    id: '0',
    text: 'Hallo 👋, herzlich willkommen im Finanz-Quiz.',
    active: true,
  },

  {
    id: '1',
    title: 'Start',
    text: 'Womit willst du dich beschäftigen?',
    parentId: '0',
  },

  {
    id: '1.1',
    title: 'Sparen',
    parentId: '1',
  },
  {
    id: '1.2',
    title: 'Absicherung',
    parentId: '1',
  },
  {
    id: '1.3',
    title: 'Investieren',
    parentId: '1',
  },
];

export const categoriesAtom = atomWithStorage('categoriesAtom', categories);
