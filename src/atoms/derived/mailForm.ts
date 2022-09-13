import { atom } from 'jotai';
import { mailFormAtom } from '../mailForm';

export const firstNameAtom = atom(
  (get) => {
    const mailForm = get(mailFormAtom);

    return mailForm.firstName;
  },

  (get, set, value: string) => {
    const mailForm = get(mailFormAtom);

    set(mailFormAtom, {
      ...mailForm,
      firstName: value,
    });
  }
);

export const emailAtom = atom(
  (get) => {
    const mailForm = get(mailFormAtom);

    return mailForm.email;
  },
  (get, set, value: string) => {
    const mailForm = get(mailFormAtom);

    set(mailFormAtom, {
      ...mailForm,
      email: value,
    });
  }
);
