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

        <h1 className="tw-flex-1 tw-text-jansen-purple tw-font-bold tw-text-2xl tw-text-center">{category.text}</h1>
      </div>

      {subCategories.map((subCategory) => (
        <div key={subCategory.id}>
          {category.parentId ? (
            <label
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
                    Ich bin Andreas Jansen, Finanzexperte, Autor des Finanz-Checks und dein Begleiter durch den Check.
                    Das Ziel des Finanz-Checks ist es <strong>deine persönlichen Finanzlücken</strong> und <strong>Finanz-Potenziale</strong> zu finden und dir <strong>konkrete Handlungsoptionen</strong> vorzuschlagen,
                    mit denen du direkt <strong>Geld sparst</strong>, <strong>besser abgesichert</strong> bist und <strong>cleverer investierst</strong>. 
                  </p>
                </div>
              </div>

              <p className="tw-py-2 tw-text-xs tw-text-jansen-gray">
                Im Rahmen des Finanz-Checks werden deine angegeben personenbezogenen Daten gemäß der <a className="tw-underline" href="https://andreasjansen.com/datenschutz/" target="_blank">Datenschutzerklärung</a> verarbeitet, um dir ein aussagekräftiges Ergebnis zu liefern. Bist du bereit loszulegen? 
              </p>

              <button
                className="tw-cursor-pointer tw-border-jansen-purple tw-bg-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-yellow tw-text-center tw-w-full tw-font-bold tw-text-xl"
                onClick={() => handleSubCategorySelected(subCategory.id)}
              >
                Alles klar! Los geht's
              </button>

              <div className="tw-mt-5 tw-flex tw-justify-center tw-flex-col md:tw-flex-row tw-items-center tw-gap-2 md:tw-gap-10">
                <div>✔️ Sofort-Auswertung in 3 Min! </div>
                <div>✔️ Entdecke deine Potenziale! </div>
                <div>✔️ 6-Wochen-Finanz-Fahrplan </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
