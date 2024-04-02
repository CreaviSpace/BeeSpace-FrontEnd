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

  // const [trash, setTrash] = useState<number[]>([]);
  const { questions, setQuestions } = useQuestionsData();

  const { isLoading, isError, data, isFetching } = useFeedBackGet(
    (update as string) === 't' ? parseInt(id as string) : undefined
  );

  const { mutate: feedBackPost } = useFeedBackPost(
    parseInt(id as string),
    questions
  );

  const { mutate: feedBackPut } = useFeedBackPut(
    parseInt(id as string),
    questions
  );

  useEffect(() => {
    if (!isLoading && (update as string) === 't') {
      const newQuestions = [...data];
      newQuestions.map((question, index) => {
        const choiceItem: string[] = [];
        question.choiceItems.map((item: { id: number; item: string }) => {
          choiceItem.push(item.item);
        });
        newQuestions[index].choiceItems = choiceItem;
      });
      setQuestions(newQuestions);
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

    // if (update && update[0] === 't' && id !== undefined) {
    //   const newTrash: number[] = [...trash];
    //   newTrash.push(id);
    //   setTrash(newTrash);
    // }
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
      <section className="max-w-[48rem] m-auto relative">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <QuestionBox questions={questions} setQuestions={setQuestions} />
        <div className="flex flex-col gap-3">
          {questions.map((item, index) => {
            if (item.questionType === '객관식') {
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
            } else if (item.questionType === '주관식') {
              return (
                <ShortAnswerQuestion
                  key={`${item.questionType}-${index}`}
                  questions={questions}
                  currentIndex={index}
                  handelChangeQuestion={handelChangeQuestion}
                  handelQuestionDelete={handelQuestionDelete}
                />
              );
            } else if (item.questionType === '체크박스') {
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
