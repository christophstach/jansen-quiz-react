import { Category } from '../../types';

export type CategoryPageProps = {
  category: Category;
  subCategories: Category[];
  selectedSubCategory?: Category;
  onSubCategorySelected: (subCategoryId: string) => void;
};

export function CategoryPage(props: CategoryPageProps) {
  const { category, subCategories, selectedSubCategory, onSubCategorySelected } = props;

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
        <>
          {category.parentId ? (
            <label
              key={subCategory.id}
              htmlFor={`sub-category-${subCategory.id}`}
              className="tw-cursor-pointer tw-border-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-purple tw-flex tw-gap-3 tw-items-center"
            >
              <div className="flex items-center">
                <input
                  readOnly
                  name="sub-category"
                  type="radio"
                  id={`sub-category-${subCategory.id}`}
                  value={subCategory.id}
                  checked={subCategory.id === selectedSubCategory?.id}
                  onClick={() => handleSubCategorySelected(subCategory.id)}
                />
              </div>

              <div>{subCategory.title}</div>
            </label>
          ) : (
            <>
              <div className="tw-py-2 tw-my-5 tw-flex tw-gap-4">
                <div className="tw-w-64">
                  <img
                    className="tw-w-full tw-rounded-full"
                    src="https://andreasjansen.com/wp-content/uploads/2022/09/Foto-Andreas-Jansen.png"
                    alt="Ich"
                  />
                </div>
                <div>
                  <p>
                    Ich bin Andreas, Finanzexperte, Autor des Quizzes und dein Begleiter durchs Quiz. Das Ziel des
                    Quizzes ist es deine persönlichen Finanzlücken und Potenzial zu finden. Fülle den Test
                    wahrheitsgemäßg aus und entscheide dich bei offenen Fragen spontan.
                  </p>
                </div>
              </div>

              <p className="tw-py-2 tw-text-xs tw-text-jansen-gray">
                Im Rahmen des Finanz-Quizzes werden deine angegeben personenbezogen Daten gemäß der Datenschutzerklärung
                verarbeitet, um dir ein aussagekräftes Ergebnis zu liefern.
              </p>

              <button
                className="tw-cursor-pointer tw-border-jansen-purple tw-bg-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-yellow tw-text-center tw-w-full tw-font-bold tw-uppercase tw-text-xl"
                onClick={() => handleSubCategorySelected(subCategory.id)}
              >
                {subCategory.title}
              </button>
            </>
          )}
        </>
      ))}
    </>
  );
}
