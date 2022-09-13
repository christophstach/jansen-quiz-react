import { atom } from 'jotai';
import { Category } from '../../types';
import { findById, replaceAtIndex } from '../../utils';
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
        if (category.id === value.id) {
          return {
            ...value,
            active: true,
          };
        } else {
          return {
            ...category,
            active: false,
          };
        }
      })
    );
  }
);

export const currentCategorySelectedSubCategoryIdAtom = atom(
  (get) => {
    const currentCategory = get(currentCategoryAtom);

    return currentCategory.selectedSubCategoryId;
  },
  (get, set, value: string | undefined) => {
    const categories = get(categoriesAtom);
    const currentCategory = get(currentCategoryAtom);

    if (currentCategory) {
      const index = categories.findIndex((category) => category.id === currentCategory.id);

      set(categoriesAtom, replaceAtIndex(categories, index, { ...currentCategory, selectedSubCategoryId: value }));
    }
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

export const currentCategoryPageAtom = atom(
  (get) => {
    const currentCategory = get(currentCategoryAtom);

    return currentCategory.page ? currentCategory.page : 0;
  },
  (get, set, value: number | undefined) => {
    const categories = get(categoriesAtom);
    const currentCategory = get(currentCategoryAtom);

    const index = categories.findIndex((cagegory) => cagegory.id === currentCategory.id);

    set(categoriesAtom, replaceAtIndex(categories, index, { ...currentCategory, page: value }));
  }
);

export const currentCategorySiblingsAtom = atom((get) => {
  const categories = get(categoriesAtom);
  const currentCategory = get(currentCategoryAtom);

  return categories.filter(
    (category) => category.parentId === currentCategory.parentId && category.id !== currentCategory.id
  );
});

export const nextCategoryAtom = atom(
  (get) => {
    const currentCategorySiblings = get(currentCategorySiblingsAtom);
    const parentCategory = get(parentCategoryAtom);

    if (parentCategory?.finalizedSubCategories) {
      return currentCategorySiblings.find((category) => !parentCategory.finalizedSubCategories?.includes(category.id));
    } else {
      return currentCategorySiblings[0];
    }
  },
  (get, set, value: Category) => {
    const nextCategory = get(nextCategoryAtom);
    const categories = get(categoriesAtom);
    const index = categories.findIndex((category) => category.id === nextCategory?.id);

    set(categoriesAtom, replaceAtIndex(categories, index, value));
  }
);

export const hasNextCategoryAtom = atom((get) => {
  const nextCategory = get(nextCategoryAtom);

  return !!nextCategory;
});

export const finalizeNextCategoryAtom = atom((get) => {
  const nextCategory = get(nextCategoryAtom);

  console.log(nextCategory);
});

export const parentCategoryAtom = atom(
  (get) => {
    const categories = get(categoriesAtom);
    const currentCategory = get(currentCategoryAtom);

    return categories.find((category) => category.id === currentCategory.parentId);
  },
  (get, set, value: Category) => {
    const categories = get(categoriesAtom);
    const currentCategory = get(currentCategoryAtom);
    const parentIndex = categories.findIndex((category) => category.id === currentCategory.parentId);

    set(categoriesAtom, replaceAtIndex(categories, parentIndex, value));
  }
);

export const selectedSubCategoryAtom = atom((get) => {
  const categories = get(categoriesAtom);
  const currentCategorySelectedSubCategoryId = get(currentCategorySelectedSubCategoryIdAtom);

  return findById(categories, currentCategorySelectedSubCategoryId);
});