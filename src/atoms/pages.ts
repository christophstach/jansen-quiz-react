import { atomWithStorage } from 'jotai/utils';
import { Page } from '../types';

export const pagesAtom = atomWithStorage<Page[]>('pagesAtom', []);
