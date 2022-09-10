import { atom } from 'jotai';
import { Category } from '../../types';
import { replaceAtIndex } from '../../utils';
import { categoriesAtom } from '../categories';

export const currentCategoryAtom = atom(
  (get) => {
    const categories = get(categoriesAtom);

    return categories.find((category) => category.active)!;
  },
  (get, set, value: Category) => {
    const categories = get(categoriesAtom);

    set(
      categoriesAtom,
      categories.map((category) => {
        return {
          ...category,
          active: category.id === value.id,
        };
      })
    );
  }
);

export const currentSubCategoriesAtom = atom((get) => {
  const currentCategory = get(currentCategoryAtom);
  const categories = get(categoriesAtom);

  return categories.filter((category) => category.parentId === currentCategory.id);
});

export const isRootCurrentCategoryAtom = atom((get) => {
  const currentCategory = get(currentCategoryAtom);

  return currentCategory.parentId === undefined;
});

export const isLeafCurrentCategoryAtom = atom((get) => {
  const currentSubCategories = get(currentSubCategoriesAtom);

  return currentSubCategories.length === 0;
});



export const currentCategoryQuestionIndexAtom = atom(
  (get) => {
    const currentCategory = get(currentCategoryAtom);


    return currentCategory.questionIndex;
  },
  (get, set, value: number) => {
    const categories = get(categoriesAtom);
    const currentCategory = get(currentCategoryAtom);

    const index = categories.findIndex((cagegory) => cagegory.id === currentCategory.id);

    set(
      categoriesAtom,
      replaceAtIndex(categories, index, { ...currentCategory, questionIndex: value })
    );
  }
);
