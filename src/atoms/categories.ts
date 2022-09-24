import { atomWithStorage } from 'jotai/utils';
import { Category } from '../types';

const categories: Category[] = [
  {
    id: '0',
    text: 'Hallo, Andreas hier 👋 Herzlich willkommen im Finanz-Check!',
    active: true,
  },

  {
    id: '1',
    title: 'Alles klar! Los geht\'s',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Target.png',
    text: 'Welches dieser Ziele steht bei dir im Fokus?',
    parentId: '0',
  },

  {
    id: '1.1',
    title: 'Meine Ausgaben senken',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/2.png',
    finalizeCategoryText: 'Möchtest du auch deine Sparpotentiale ermitteln (empfohlen)?',
    parentId: '1',
  },
  {
    id: '1.2',
    title: 'Mein Vermögen aufbauen',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/2.png',
    finalizeCategoryText: 'Möchtest du auch deine Investionschancen ermitteln (empfohlen)?',
    parentId: '1',
  },
  {
    id: '1.3',
    title: 'Absicherung für mich und meine Familie',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/3.png',
    finalizeCategoryText: 'Möchtest du auch deine Absicherungslücken ermitteln (empfohlen)?',
    parentId: '1',
  },
];

export const categoriesAtom = atomWithStorage('categoriesAtom', categories);
