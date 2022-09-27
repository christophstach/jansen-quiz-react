import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { Page } from '../types';

export const pagesAtom = atomWithStorage<Page[]>(
  'pagesAtom',
  [],
  createJSONStorage(() => sessionStorage)
);
export const finalQuestionPageAtom = atomWithStorage(
  'finalQuestionPageAtom',
  0,
  createJSONStorage(() => sessionStorage)
);
