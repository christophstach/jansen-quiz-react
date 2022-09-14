import { atomWithStorage } from 'jotai/utils';
import { Category } from '../types';

const categories: Category[] = [
  // {
  //   id: '0',
  //   title: '',
  //   text: 'Für welchen Bereich interresierst du dich am meisten?',
  //   active: true,
  // },

  {
    id: '1',
    title: 'Finanzen',
    text: 'Womit willst du dich beschäftigen?',
    active: true,
    // parentId: '0',
  },
  // {
  //   id: '2',
  //   title: 'Gesundheit',
  //   parentId: '0',
  // },
  // {
  //   id: '3',
  //   title: 'Happiness',
  //   parentId: '0',
  // },

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
