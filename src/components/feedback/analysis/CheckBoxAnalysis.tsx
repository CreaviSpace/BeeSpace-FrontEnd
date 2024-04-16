import AnswerTitle from '../AnswerTitle';

interface ICheckBoxAnalysisProps {
  answer: {
    choiceItemsAnalysis: { choiceItem: string; selectedCount: number }[];
    question: string;
    questionType: string;
  };
}

export default function CheckBoxAnalysis({ answer }: ICheckBoxAnalysisProps) {
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <AnswerTitle question={answer.question} />

      <ul>
        {answer.choiceItemsAnalysis.map((item, index) => (
          <li key={index} className="p-2 border-b border-gray20">
            <span>({item.selectedCount})</span>
            {item.choiceItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
