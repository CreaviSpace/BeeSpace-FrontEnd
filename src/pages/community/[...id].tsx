import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import Tag from '@/components/Tag';
import { card, details } from '@/utils/data';

export default function CommunityDetail() {
  return (
    <main className="h-full gap-5 max-w-max_w m-auto py-10 px-16 relative ">
      <section className="max-w-max_w m-auto mb-5">
        <DetailsTitle
          type="community"
          time={card.date}
          views={card.views}
          title={details.title}
          likes={card.comment}
          userName={card.name}
        />
        <SideButton />
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
