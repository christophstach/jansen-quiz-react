import { Answer, Question } from '../../types';

export type SimpleQuestionPageProps = {
  question: Question;
  answers: Answer[];
  selectedAnswerId?: string | null;
  onAnswerSelected: (answerId: string) => void;
};

export default function SimpleQuestionPage(props: SimpleQuestionPageProps) {
  const { question, answers, selectedAnswerId = null, onAnswerSelected } = props;

  return (
    <>
      <div className="tw-flex tw-items-center tw-mb-10">
        {question.icon && (
          <div className="tw-pr-5">
            <img className="tw-w-8 tw-h-8" src={question.icon} alt="Question Icon" />
          </div>
        )}

        <h1 className="tw-flex-1 tw-text-jansen-purple tw-font-bold tw-text-lg tw-text-center">{question.text}</h1>
      </div>

      {answers.map((answer) => (
        <label
          key={answer.id}
          htmlFor={`simple-answer-${answer.id}`}
          className="tw-cursor-pointer tw-border-jansen-purple tw-border tw-my-5 tw-p-5 tw-text-jansen-purple tw-flex tw-gap-3 tw-items-center"
        >
          <div className="flex items-center">
            <input
              readOnly
              name="simple-answer"
              type="radio"
              id={`simple-answer-${answer.id}`}
              value={answer.id}
              checked={answer.id === selectedAnswerId}
              onClick={() => onAnswerSelected(answer.id)}
            />
          </div>

          <div>{answer.text}</div>
        </label>
      ))}
    </>
  );
}
