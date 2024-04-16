import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxAnswer from '@/components/feedback/answer/CheckBoxAnswer';
import MultipleChoiceAnswer from '@/components/feedback/answer/MultipleChoiceAnswer';
import ShortAnswerAnswer from '@/components/feedback/answer/ShortAnswerAnswer';
import SkeletonFeedBack from '@/components/skeleton/SkeletonFeedBack';
import useFeedBackGet from '@/hooks/feedback/useFeedBackGet';
import useFeedBackPost from '@/hooks/feedback/useFeedBackPost';
import useAnswerData from '@/store/feedback/useAnswerData';
import {
  IAnswerType,
  IQuestionAnswerType,
  IQuestionType,
} from '@/types/global';

export default function FeedBackList() {
  const router = useRouter();
  const { id } = router.query;

  const { answer, setAnswer } = useAnswerData();

  const { isLoading, isError, data, isFetching } = useFeedBackGet(
    parseInt(id as string)
  );

  const { mutate } = useFeedBackPost(parseInt(id as string), answer, 'answer');

  useEffect(() => {
    if (!isLoading && data) {
      const newAnswer: IAnswerType[] = [];
      data.map((item: IQuestionType) => {
        newAnswer.push({
          questionId: item.questionId as number,
          answer: '',
          selectedItems: [{ id: 0 }],
        });
      });
      setAnswer(newAnswer);
    }
  }, [isLoading]);

  const handleQuestionUpdate = () => {
    router.push(`/feedback/question/${id as string}?update=t`);
  };

  const handleCancel = () => {
    router.replace(`/project/${id}`);
  };

  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] m-auto relative">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <SkeletonFeedBack />
          ) : (
            data?.map((item: IQuestionAnswerType, index: number) => {
              if (item.questionType === 'SUBJECTIVE') {
                return (
                  <ShortAnswerAnswer
                    key={index}
                    question={item}
                    answer={answer}
                    setAnswer={setAnswer}
                    currentIndex={index}
                  />
                );
              } else if (item.questionType === 'OBJECTIVE') {
                return (
                  <MultipleChoiceAnswer
                    key={index}
                    question={item}
                    answer={answer}
                    setAnswer={setAnswer}
                    currentIndex={index}
                  />
                );
              } else if (item.questionType === 'CHECKBOX') {
                return (
                  <CheckBoxAnswer
                    key={index}
                    question={item}
                    answer={answer}
                    setAnswer={setAnswer}
                    currentIndex={index}
                  />
                );
              }
            })
          )}
        </div>
        <div className="flex justify-between items-center mt-8 gap-2">
          <CustomButton
            className="py-2 px-3"
            color="secondary"
            onClick={handleQuestionUpdate}>
            수정
          </CustomButton>
          <CustomButton
            className="py-2 px-3"
            color="secondary"
            onClick={() => router.push(`/feedback/analysis/${id}`)}>
            보기
          </CustomButton>

          <div>
            <CustomButton
              className="py-2 px-3 mr-2 bg-white"
              onClick={handleCancel}>
              취소
            </CustomButton>
            <CustomButton
              color="secondary"
              className="py-2 px-3"
              onClick={() => mutate()}>
              제출
            </CustomButton>
          </div>
        </div>
      </section>
    </main>
  );
}
