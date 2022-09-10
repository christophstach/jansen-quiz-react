import { Category } from '../../types';

export type CategoryPageProps = {
  category: Category;
  subCategories: Category[];
  onSubCategorySelected: (subCategoryId: string) => void;
};

export function CategoryPage(props: CategoryPageProps) {
  const { category, subCategories, onSubCategorySelected } = props;

  function handleSubCategorySelected(subCategoryId: string) {
    onSubCategorySelected(subCategoryId);
  }

  return (
    <>
      <div className="tw-flex tw-items-center tw-mb-10">
        {category.icon && (
          <div className="tw-pr-5">
            <img className="tw-w-8 tw-h-8" src={category.icon} alt="Category Icon" />
          </div>
        )}

        <h1 className="tw-flex-1 tw-text-jansen-purple tw-font-bold tw-text-lg tw-text-center">{category.text}</h1>
      </div>

      {subCategories.map((subCategory) => (
        <label
          key={subCategory.id}
          htmlFor={`sub-category-${subCategory.id}`}
          className="tw-cursor-pointer tw-border-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-purple tw-flex tw-gap-3 tw-items-center"
        >
          <div className="flex items-center">
            <input
              name="sub-category"
              type="radio"
              id={`sub-category-${subCategory.id}`}
              value={subCategory.id}
              onClick={() => handleSubCategorySelected(subCategory.id)}
            />
          </div>

          <div>{subCategory.title}</div>
        </label>
      ))}
    </>
  );
}
