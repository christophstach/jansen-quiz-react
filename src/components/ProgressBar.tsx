export type ProgessBarProps = {
  page: number;
  maxPages: number;
};

export function ProgressBar(props: ProgessBarProps) {
  const { page, maxPages } = props;
  let percent: number;

  if (page === -1) {
    percent = 5;
  } else if (page === -2) {
    percent = 85;
  } else if (page === -3) {
    percent = 95;
  } else if (page === -4) {
    percent = 0;
  } else {
    percent = Math.max(Math.min(Math.round((page / maxPages) * 100), 84), 10);
  }

  return (
    <div className="tw-w-full tw-bg-gray-200 tw-rounded-full">
      <div
        className="tw-bg-jansen-yellow tw-text-xs tw-font-medium tw-text-jansen-purple tw-text-center tw-h-2 tw-leading-none tw-rounded-l-full tw-rounded-r-full tw-transition-[width] tw-ease-in-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
