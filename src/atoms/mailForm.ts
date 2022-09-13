import { atomWithStorage } from 'jotai/utils';

export const mailFormAtom = atomWithStorage('mailFormAtom', { firstName: '', email: '' });