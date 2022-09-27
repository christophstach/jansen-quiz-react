import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const mailFormAtom = atomWithStorage(
  'mailFormAtom',
  { firstName: '', email: '' },
  createJSONStorage(() => sessionStorage)
);
