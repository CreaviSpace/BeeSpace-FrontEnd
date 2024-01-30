import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import RecruitDetails from '@/components/details/recruitment/RecruitDetails';
import RecruitPosition from '@/components/details/recruitment/RecruitPosition';
import TechStackList from '@/components/details/recruitment/TechStackList';
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
    <main className="m-auto py-10 h-full gap-5 w-fit relative">
      <section className="m-auto max-w-max_w mb-5">
        <DetailsTitle {...commonDetailsProps} />
        <SideButton />
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
      <CommentContainer />
    </main>
  );
}
