import { atom } from 'jotai';

export const formDataAtom = atom((get) => {
  const formData = new FormData();

  return formData;
});

export const payloadAtom = atom((get) => {
  const payload: Record<string, string | string[]> = {};

  return payload;
});
