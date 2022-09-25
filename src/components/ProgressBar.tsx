import { PageType } from '../types';

export type ProgessBarProps = {
  page: number;
  maxPages: number;
};

export function ProgressBar(props: ProgessBarProps) {
  const { page, maxPages } = props;
  const percent = (page / maxPages) * 100;

  return (
    <div className="tw-w-full tw-bg-gray-200 tw-rounded-full">
      <div
        className="tw-bg-jansen-yellow tw-text-xs tw-font-medium tw-text-jansen-purple tw-text-center tw-h-2 tw-leading-none tw-rounded-l-full tw-rounded-r-full tw-transition-[width] tw-ease-in-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
