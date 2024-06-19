import { useRouter } from 'next/router';

import CustomButton from '@/components/button/CustomButton';
import CheckBoxAnalysis from '@/components/feedback/analysis/CheckBoxAnalysis';
import MultipleChoiceAnalysis from '@/components/feedback/analysis/MultipleChoiceAnalysis';
import ShortAnaysis from '@/components/feedback/analysis/ShortAnaysis';
import SkeletonFeedBack from '@/components/skeleton/SkeletonFeedBack';
import useGetFeedBackAnalysis from '@/hooks/queries/feedback/useGetFeedBackAnalysis';
import { useGetProjectPost } from '@/hooks/queries/post/useGetPost';
import Custom404 from '@/pages/404';

interface IAnalysisType {
  answers?: string[];
  choiceItemsAnalysis?: { choiceItem: string; selectedCount: number }[];
  question: string;
  questionType: string;
}

export default function Analysis() {
  const router = useRouter();
  const { id } = router.query;

  const { isError: isErrorProject } = useGetProjectPost(
    'project',
    id as string
  );

  const { isLoading, data, isSuccess } = useGetFeedBackAnalysis(
    parseInt(id as string)
  );

  const handleQuestionUpdate = () => {
    router.push(`/feedback/question/${id as string}?update=t`);
  };

  const handleFeedBackWrite = () => {
    router.replace(`/feedback/question/${id}`);
  };

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
          {isSuccess ? (
            isLoading ? (
              <SkeletonFeedBack />
            ) : data?.length > 0 ? (
              <>
                {data?.map((item: IAnalysisType, index: number) => {
                  if (item.questionType === 'SUBJECTIVE') {
                    return <ShortAnaysis key={index} answer={data[index]} />;
                  } else if (item.questionType === 'OBJECTIVE') {
                    return (
                      <MultipleChoiceAnalysis
                        key={index}
                        answer={data[index]}
                      />
                    );
                  } else if (item.questionType === 'CHECKBOX')
                    return (
                      <CheckBoxAnalysis key={index} answer={data[index]} />
                    );
                })}

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
              </>
            ) : (
              <div className="mt-8 w-full flex justify-center gap-2">
                <CustomButton
                  className="py-2 px-3 w-full"
                  onClick={handleCancel}>
                  취소
                </CustomButton>
                <CustomButton
                  color="secondary"
                  className="py-2 px-3 w-full"
                  onClick={handleFeedBackWrite}>
                  피드백 작성
                </CustomButton>
              </div>
            )
          ) : (
            <button
              onClick={async () => {
                // await queryClient.resetQueries({
                //   queryKey: [queryKeys.FEEDBACK_ANALYSIS, id],
                // });
                // await refetch();
              }}>
              다시 불러오기
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
