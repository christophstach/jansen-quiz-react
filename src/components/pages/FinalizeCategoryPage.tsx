import { Category } from '../../types';

export type FinalizeCategoryPageProps = {
  nextCategory: Category;
  defaultValue?: boolean;
  onContinueWithNextCategoryValueChange: (value: boolean) => void;
};

export function FinalizeCategoryPage(props: FinalizeCategoryPageProps) {
  const { nextCategory, defaultValue, onContinueWithNextCategoryValueChange } = props;

  return (
    <>
      <div className="tw-flex tw-items-center tw-mb-10">
        <h1 className="tw-flex-1 tw-text-jansen-purple tw-font-bold tw-text-2xl tw-text-center">
          
          {nextCategory.finalizeCategoryText}
        </h1>
      </div>

      <label
        htmlFor="finalize-category-yes"
        className="tw-cursor-pointer tw-border-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-purple tw-flex tw-gap-3 tw-items-center"
      >
        <div className="flex items-center">
          <input
            readOnly
            type="radio"
            id="finalize-category-yes"
            name="finalize-category"
            checked={defaultValue === true}
            onClick={() => onContinueWithNextCategoryValueChange(true)}
          />
        </div>

        <div>Ja</div>
      </label>

      <label
        htmlFor="finalize-category-no"
        className="tw-cursor-pointer tw-border-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-purple tw-flex tw-gap-3 tw-items-center"
      >
        <div className="flex items-center">
          <input
            readOnly
            type="radio"
            id="finalize-category-no"
            name="finalize-category"
            checked={defaultValue === false}
            onClick={() => onContinueWithNextCategoryValueChange(false)}
          />
        </div>

        <div>Nein</div>
      </label>
    </>
  );
}
