import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxQuestion from '@/components/feedback/question/CheckBoxQuestion';
import MultipleChoiceQuestion from '@/components/feedback/question/MultipleChoiceQuestion';
import ShortAnswerQuestion from '@/components/feedback/question/ShortAnswerQuestion';
import QuestionBox from '@/components/feedback/QuestionBox';
import useFeedBackGet from '@/hooks/feedback/useFeedBackGet';
import useFeedBackPost from '@/hooks/feedback/useFeedBackPost';
import useFeedBackPut from '@/hooks/feedback/useFeedBackPut';
import useQuestionsData from '@/store/feedback/useQuestionsData';

export default function Feedback() {
  const router = useRouter();
  const { id, update } = router.query;

  const { questions, setQuestions, init } = useQuestionsData();

  const { isLoading, isError, data, isFetching } = useFeedBackGet(
    parseInt(id as string)
  );

  const { mutate: feedBackPost } = useFeedBackPost(
    parseInt(id as string),
    questions,
    'question'
  );

  const { mutate: feedBackPut } = useFeedBackPut(
    parseInt(id as string),
    questions
  );

  useEffect(() => {
    if (!isLoading && (update as string) === 't' && data) {
      const newQuestions = [...data];
      newQuestions.map((question, index) => {
        const newChoiceItem: string[] = [];
        question.choiceItems.map((choiceItem: { id: number; item: string }) => {
          newChoiceItem.push(choiceItem.item);
        });
        newQuestions[index].choiceItems = newChoiceItem;
      });
      setQuestions(newQuestions);
    } else {
      init();
    }
  }, [isLoading, id]);

  useEffect(() => {
    if (!isLoading) {
      if (data?.length > 0) {
        router.replace(`/feedback/question/${id}?update=t`);
      }
    }
  }, [isLoading]);

  const handelChangeQuestion = (currentIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].question = value;
    setQuestions(newQuestions);
  };

  const handelQuestionDelete = (currentIndex: number, id?: number) => {
    const newQuestion = questions.filter((_, index) => index !== currentIndex);
    setQuestions(newQuestion);
  };

  const handleQuestionSave = () => {
    if (update && update[0] !== 't') {
      feedBackPost();
    } else {
      feedBackPut();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] min-w-min_w m-auto relative tablet:px-8 mobile:px-6">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <QuestionBox questions={questions} setQuestions={setQuestions} />
        <div className="flex flex-col gap-3">
          {questions.map((item, index) => {
            if (item.questionType === 'OBJECTIVE') {
              return (
                <MultipleChoiceQuestion
                  key={`${item.questionType}-${index}`}
                  questions={questions}
                  setQuestions={setQuestions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            } else if (item.questionType === 'SUBJECTIVE') {
              return (
                <ShortAnswerQuestion
                  key={`${item.questionType}-${index}`}
                  questions={questions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            } else if (item.questionType === 'CHECKBOX') {
              return (
                <CheckBoxQuestion
                  key={`${item.questionType}-${index}`}
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
          <CustomButton className="py-2 px-3 bg-white" onClick={handleCancel}>
            취소
          </CustomButton>
          <CustomButton
            className="py-2 px-3"
            color="secondary"
            onClick={handleQuestionSave}>
            저장
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
