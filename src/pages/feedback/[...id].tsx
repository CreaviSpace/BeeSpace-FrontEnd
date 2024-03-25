import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxQuestion from '@/components/feedback/CheckBoxQuestion';
import MultipleChoiceQuestion from '@/components/feedback/MultipleChoiceQuestion';
import QuestionBox from '@/components/feedback/QuestionBox';
import ShortAnswerQuestion from '@/components/feedback/ShortAnswerQuestion';
import { IquestionType } from '@/types/global';

export default function Feedback() {
  const [questions, setQuestions] = useState<IquestionType[]>([
    { question: '', type: 'multipleChoice', chiceItems: [] },
    { question: '', type: 'short', chiceItems: [] },
    { question: '', type: 'checkBox', chiceItems: [] },
  ]);

  const questionTypes = [
    {
      text: '객관식',
      onClick: function handleMultipleChoice() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          type: 'multipleChoice',
          chiceItems: [],
        });
        setQuestions(newQuestions);
      },
    },
    {
      text: '단답형',
      onClick: function handleShortAnswer() {
        const newQuestions = [...questions];
        newQuestions.push({ question: '', type: 'short', chiceItems: [] });
        setQuestions(newQuestions);
      },
    },
    {
      text: '체크박스',
      onClick: function handleCheckBox() {
        const newQuestions = [...questions];
        newQuestions.push({ question: '', type: 'checkBox', chiceItems: [] });
        setQuestions(newQuestions);
      },
    },
  ];

  const handelChangeQuestion = (currentIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].question = value;
    setQuestions(newQuestions);
  };

  const handelQuestionDelete = (currentIndex: number) => {
    const newQuestion = questions.filter((_, index) => index !== currentIndex);
    setQuestions(newQuestion);
  };

  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] m-auto relative">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <QuestionBox questionTypes={questionTypes} />
        <div className="flex flex-col gap-3">
          {questions.map((item, index) => {
            if (item.type === 'multipleChoice') {
              return (
                <MultipleChoiceQuestion
                  key={`${item.type}-${index}`}
                  questions={questions}
                  setQuestions={setQuestions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            } else if (item.type === 'short') {
              return (
                <ShortAnswerQuestion
                  key={`${item.type}-${index}`}
                  questions={questions}
                  setQuestions={setQuestions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            } else if (item.type === 'checkBox') {
              return (
                <CheckBoxQuestion
                  key={`${item.type}-${index}`}
                  questions={questions}
                  setQuestions={setQuestions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            }
          })}
        </div>
        <div className="flex justify-end mt-8 gap-2">
          <CustomButton className="py-2 px-3 bg-white">취소</CustomButton>
          <CustomButton className="py-2 px-3" color="secondary">
            저장
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
