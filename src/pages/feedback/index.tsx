import CheckBoxQuestion from '@/components/feedback/CheckBoxQuestion';
import MultipleChoiceQuestion from '@/components/feedback/MultipleChoiceQuestion';
import QuestionBox from '@/components/feedback/QuestionBox';
import ShortAnswerQuestion from '@/components/feedback/ShortAnswerQuestion';

export default function index() {
  return (
    <main className="bg-blue10 py-10">
      <section className="max-w-[48rem] m-auto relative">
        <h1 className="text-3xl font-semibold mb-4">피드백</h1>
        <QuestionBox />
        <div className="flex flex-col gap-3">
          <ShortAnswerQuestion />
          <MultipleChoiceQuestion />
          <CheckBoxQuestion />
        </div>
      </section>
    </main>
  );
}
