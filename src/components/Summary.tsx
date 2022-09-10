import { SummaryQuestion } from '../types';

export type SummaryProps = {
  questions: SummaryQuestion[];
};

export default function Summary(props: SummaryProps) {
  const { questions } = props;

  return (
    <>
      {questions.map((question) => (
        <div key={question.id}>
          <div className="tw-flex tw-items-center tw-py-5">
            {question.icon && (
              <div className="tw-pr-5">
                <img className="tw-w-8 tw-h-8" src={question.icon} alt="Question Icon" />
              </div>
            )}

            <h1 className="tw-flex-1 tw-text-jansen-purple tw-font-bold tw-text-lg">{question.text}</h1>
          </div>

          {question.answers.map((answer) => (
            <div className="tw-py-1" key={answer.id}>
              {answer.selected ? <strong>{answer.text}</strong> : <span>{answer.text}</span>}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
