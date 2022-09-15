import { atomWithStorage } from 'jotai/utils';
import { Page } from '../types';

export const pagesAtom = atomWithStorage<Page[]>('pagesAtom', []);
export const finalQuestionPageAtom = atomWithStorage('finalQuestionPageAtom', 0);
