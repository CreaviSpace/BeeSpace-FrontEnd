import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle';
import { FaList } from '@react-icons/all-files/fa/FaList';
import { useEffect, useRef, useState } from 'react';

import { IQuestionType } from '@/types/global';

interface IQuestionBoxProps {
  questions: IQuestionType[];
  setQuestions: (questions: IQuestionType[]) => void;
}

export default function QuestionBox({
  questions,
  setQuestions,
}: IQuestionBoxProps) {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isQuestionToggle, setIsQuestionToggle] = useState(false);
  const [isTableWidth, setIsTableWidth] = useState(false);
  const [isHeaderFix, setIsHaderFix] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const questionTypes = [
    {
      text: '객관식',
      onClick: function handleMultipleChoice() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'OBJECTIVE',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
    {
      text: '단답형',
      onClick: function handleShortAnswer() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'SUBJECTIVE',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
    {
      text: '체크박스',
      onClick: function handleCheckBox() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'CHECKBOX',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
  ];

  const handleQuestionBoxMove = () => {
    if (divRef.current && !isHeaderFix) {
      setIsHeaderSticky(!isHeaderSticky);
      setIsQuestionToggle(!isQuestionToggle);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerThreshold = 90;

      const scrollY = window.scrollY;

      // 박스가 헤더에 도착했으면
      if (window.innerWidth < 1280) {
        setIsTableWidth(true);
        if (scrollY >= headerThreshold) {
          setIsHeaderSticky(true);
          setIsHaderFix(false);
        } else {
          setIsHeaderSticky(false);
          setIsQuestionToggle(false);
          setIsHaderFix(true);
        }
      } else {
        setIsTableWidth(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-[4.0625rem] ml-auto translate-x-40 w-fit z-10 tablet:translate-x-0 mobile:translate-x-0 tablet:mx-auto mobile:mx-auto tablet:w-full mobile:w-full tablet:mb-12 mobile:mb-12 h-0 tablet:h-fit mobile:h-fit`}>
      <div
        className={`text-bs_14 flex flex-col gap-3 bg-white rounded-bs_5 px-4 py-5 border border-gray30 transition-all tablet:rounded-none mobile:rounded-none ${isTableWidth ? (isHeaderSticky ? '-translate-y-[8.125rem]' : isQuestionToggle ? 'translate-y-5' : 'translate-y-0') : null}`}
        ref={divRef}>
        {questionTypes.map((type, index) => (
          <button key={index} className="flex" onClick={type.onClick}>
            <BsPlusCircle size={18} />
            <span className="ml-1">{type.text}</span>
          </button>
        ))}

        <button
          className={`tablet:block mobile:block hidden absolute -bottom-9 left-0 p-2 rounded-b-md bg-blue20 z-10 cursor-pointer transition-all`}
          onClick={handleQuestionBoxMove}>
          <FaList size={20} />
        </button>
      </div>
    </div>
  );
}
