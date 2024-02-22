import CustomButton from '@/components/button/CustomButton';
import CheckBoxQuestion from '@/components/feedback/CheckBoxQuestion';
import MultipleChoiceQuestion from '@/components/feedback/MultipleChoiceQuestion';
import QuestionBox from '@/components/feedback/QuestionBox';
import ShortAnswerQuestion from '@/components/feedback/ShortAnswerQuestion';

export default function feedback() {
  return (
    <main className="bg-blue10 py-10 w-full h-full min-h-[calc(100vh-4rem-250px)]">
      <section className="max-w-[48rem] m-auto relative">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <QuestionBox />
        <div className="flex flex-col gap-3">
          <ShortAnswerQuestion />
          <MultipleChoiceQuestion />
          <CheckBoxQuestion />
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
