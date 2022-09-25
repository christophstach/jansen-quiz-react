export type QuizFooterProps = {
  previousButtonEnabled: boolean;
  nextButtonEnabled: boolean;

  onPreviousPage: () => void;
  onNextPage: () => void;
  onReset: () => void;
};

export function QuizFooter(props: QuizFooterProps) {
  const { previousButtonEnabled, nextButtonEnabled, onPreviousPage, onNextPage, onReset } = props;

  return (
    <div className="tw-border-t tw-border-jansen-purple tw-px-10 tw-py-5 tw-flex tw-gap-3 tw-justify-between">
      <div>
        <button
          className="tw-text-white tw-p-2 tw-px-5 tw-bg-gray-500 tw-h-full"
          onClick={onPreviousPage}
          disabled={!previousButtonEnabled}
        >
          «
        </button>
      </div>

      {/*<div>
        <button className="tw-text-white tw-p-2 tw-bg-gray-500 tw-h-full" onClick={onReset}>
          Neu beginnen
        </button>
      </div>*/}

      <div className="tw-flex-1 tw-text-right">
        <button
          className="tw-text-jansen-purple tw-bg-jansen-yellow tw-p-2 tw-h-full tw-w-full"
          onClick={onNextPage}
          disabled={!nextButtonEnabled}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
