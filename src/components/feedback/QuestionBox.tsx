import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle';
export default function QuestionBox() {
  const questionTypes = [
    { text: '객관식' },
    { text: '단답형' },
    { text: '체크박스' },
  ];
  return (
    <div className="absolute -right-[10rem] border px-4 py-5 bg-white rounded-bs_5 border-gray30">
      <ul className="text-bs_14 flex flex-col gap-3">
        {questionTypes.map((type, index) => (
          <li key={index} className="flex">
            <BsPlusCircle size={18} />
            <span className="ml-1">{type.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
