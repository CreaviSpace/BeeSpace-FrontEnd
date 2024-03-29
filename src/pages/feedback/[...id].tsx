import { useRouter } from 'next/router';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxAnswer from '@/components/feedback/answer/CheckBoxAnswer';
import MultipleChoiceAnswer from '@/components/feedback/answer/MultipleChoiceAnswer';
import ShortAnswerAnswer from '@/components/feedback/answer/ShortAnswerAnswer';
import useFeedBackGet from '@/hooks/feedback/useFeedBackGet';
import useAnswerData from '@/store/feedback/useAnswerData';
import { IQuestionAnswerType } from '@/types/global';

export default function FeedBackList() {
  const router = useRouter();
  const { id } = router.query;

  const { answer, setAnswer } = useAnswerData();

  const { isLoading, isError, data, isFetching } = useFeedBackGet(
    parseInt(id as string)
  );

  const handleQuestionUpdate = () => {
    router.push(`/feedback/question/${id as string}?update=t`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] m-auto relative">
        <div className="flex flex-col gap-3">
          {isLoading
            ? '로딩중'
            : data?.map((item: IQuestionAnswerType, index: number) => {
                if (item.questionType === '주관식') {
                  return <ShortAnswerAnswer key={index} question={item} />;
                } else if (item.questionType === '객관식') {
                  return <MultipleChoiceAnswer key={index} question={item} />;
                } else if (item.questionType === '체크박스') {
                  return <CheckBoxAnswer key={index} question={item} />;
                }
              })}
        </div>
        <div className="flex justify-between items-center mt-8 gap-2">
          <CustomButton
            className="py-2 px-3"
            color="secondary"
            onClick={handleQuestionUpdate}>
            수정
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
              onClick={handleCancel}>
              제출
            </CustomButton>
          </div>
        </div>
      </section>
    </main>
  );
}
