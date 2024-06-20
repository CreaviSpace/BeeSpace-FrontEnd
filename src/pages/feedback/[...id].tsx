import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxAnswer from '@/components/feedback/answer/CheckBoxAnswer';
import MultipleChoiceAnswer from '@/components/feedback/answer/MultipleChoiceAnswer';
import ShortAnswerAnswer from '@/components/feedback/answer/ShortAnswerAnswer';
import SkeletonFeedBack from '@/components/skeleton/SkeletonFeedBack';
import useGetFeedBack from '@/hooks/queries/feedback/useGetFeedBack';
import useMutateCreateFeedBack from '@/hooks/queries/feedback/useMutateCreateFeedBack';
import { useGetProjectPost } from '@/hooks/queries/post/useGetPost';
import useAnswerData from '@/store/feedback/useAnswerData';
import {
  IAnswerType,
  IQuestionAnswerType,
  IQuestionType,
} from '@/types/global';

import Custom404 from '../404';

export default function FeedBackList() {
  const router = useRouter();
  const { id } = router.query;

  const { answer, setAnswer } = useAnswerData();

  const { isError: isErrorProject } = useGetProjectPost(
    'project',
    id as string
  );

  const { isLoading, data } = useGetFeedBack(
    parseInt(id as string),
    'feedback'
  );

  const { mutate } = useMutateCreateFeedBack(
    parseInt(id as string),
    answer,
    'answer'
  );

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

  const handleCancel = () => {
    router.back();
  };

  if (isErrorProject) {
    return <Custom404 />;
  }

  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] m-auto relative tablet:px-8 mobile:px-6">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <SkeletonFeedBack />
          ) : data?.length > 0 ? (
            <>
              {data?.map((item: IQuestionAnswerType, index: number) => {
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
              })}

              <div className="flex justify-end items-center mt-8 gap-2">
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
            </>
          ) : (
            <div className="mt-8 w-full gap-2 text-center">
              <div className="text-bs_24 font-bold mb-5">
                작성자의 피드백 질문이 없습니다.
              </div>
              <CustomButton className="py-2 px-3 w-full" onClick={handleCancel}>
                뒤로 가기
              </CustomButton>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
