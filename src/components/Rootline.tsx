import { useAtomValue, useSetAtom } from 'jotai';

export default function Rootline() {
  /*const pages = useAtomValue(pagesState);
  const setDepth = useSetAtom(depthAtom);

  function handlePageClick(page: number) {
    setDepth(page);
  }

  return (
    <nav className="tw-relative tw-hidden xl:tw-block">
      <div className="tw-h-2 tw-w-full tw-absolute tw-bg-gray-300 tw-mt-[6px] -tw-z-2"></div>
      <div className="tw-absolute tw-h-5 tw-w-5 tw-text-3xl tw-rounded-full tw-bg-green-600 tw-right-0 tw-text-white  tw-flex tw-items-center tw-justify-center">
        <span dangerouslySetInnerHTML={{ __html: '&bullet;' }} />
      </div>

      <ul className="tw-absolute tw-flex">
        {pages.map((page, i) => (
          <li className="tw-flex tw-items-center" key={page}>
            {i < pages.length - 1 ? (
              <>
                <button
                  className="tw-h-5 tw-w-5 tw-text-[0.6rem] tw-rounded-full tw-bg-jansen-yellow tw-text-white tw-flex tw-items-center tw-justify-center"
                  onClick={() => handlePageClick(page)}
                >
                  {page + 1}
                </button>

                <div className="tw-bg-jansen-yellow tw-h-2 tw-w-3 -tw-m-1"></div>
              </>
            ) : (
              <button
                className="tw-h-5 tw-w-5 tw-text-[0.6rem] tw-rounded-full tw-bg-gray-500 tw-text-white tw-flex tw-items-center tw-justify-center"
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
  */
  return <div>Die Rootline!</div>;
}
