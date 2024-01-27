import SideButton from '@/components/button/SideButton';
import RecruitDetails from '@/components/details/recruitment/RecruitDetails';
import RecruitPosition from '@/components/details/recruitment/RecruitPosition';
import TechStackList from '@/components/details/recruitment/TechStackList';
import DetailsTitle from '@/components/DetailsTitle';
import Tag from '@/components/Tag';
import { card, details } from '@/utils/data';

export default function RecruitmentDetail() {
  const commonDetailsProps = {
    className: 'hidden',
    time: card.date,
    views: card.views,
    title: details.title,
    likes: card.comment,
    userName: card.name,
  };

  return (
    <main className="pt-20 pb-10 h-full flex justify-center max-w-[1000px] m-auto relative">
      <section className="m-auto">
        <DetailsTitle {...commonDetailsProps} />
        <RecruitDetails />
        <div className="p-6 border-b flex justify-between">
          <RecruitPosition />
          <TechStackList />
        </div>
        <div
          className="py-5 px-3"
          dangerouslySetInnerHTML={{ __html: details.content }}
        />
        <div className="mb-4">
          <Tag category="hashtag" name="string" />
        </div>
        <span className="w-full border block border-gray10" />
      </section>
      <div className="absolute -right-2 top-1/3">
        <SideButton />
      </div>
    </main>
  );
}
