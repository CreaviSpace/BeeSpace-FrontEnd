import { useRouter } from 'next/router';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxAnalysis from '@/components/feedback/analysis/CheckBoxAnalysis';
import MultipleChoiceAnalysis from '@/components/feedback/analysis/MultipleChoiceAnalysis';
import ShortAnaysis from '@/components/feedback/analysis/ShortAnaysis';
import SkeletonFeedBack from '@/components/skeleton/SkeletonFeedBack';
import useFeedBackAnalysis from '@/hooks/feedback/useFeedBackAnalysis';

interface IAnalysisType {
  answers?: string[];
  choiceItemsAnalysis?: { choiceItem: string; selectedCount: number }[];
  question: string;
  questionType: string;
}

export default function Analysis() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, isFetching } = useFeedBackAnalysis(
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
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <SkeletonFeedBack />
          ) : (
            data?.map((item: IAnalysisType, index: number) => {
              if (item.questionType === 'SUBJECTIVE') {
                return <ShortAnaysis key={index} answer={data[index]} />;
              } else if (item.questionType === 'OBJECTIVE') {
                return (
                  <MultipleChoiceAnalysis key={index} answer={data[index]} />
                );
              } else if (item.questionType === 'CHECKBOX')
                return <CheckBoxAnalysis key={index} answer={data[index]} />;
            })
          )}
        </div>

        <div className="text-right mt-8 gap-2">
          <CustomButton
            className="py-2 px-3 mr-2 bg-white"
            onClick={handleCancel}>
            취소
          </CustomButton>
          <CustomButton
            className="py-2 px-3"
            color="secondary"
            onClick={handleQuestionUpdate}>
            수정
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
