import SideButton from '@/components/button/SideButton';
import DetailsTitle from '@/components/DetailsTitle';
import Tag from '@/components/Tag';
import { card, details } from '@/utils/data';

export default function CommunityDetail() {
  return (
    <main className="m-auto py-10 h-full gap-5 w-fit relative ">
      <section className="max-w-max_w m-auto">
        <DetailsTitle
          type="community"
          time={card.date}
          views={card.views}
          title={details.title}
          likes={card.comment}
          userName={card.name}
        />
        <div
          className="py-5 px-3"
          dangerouslySetInnerHTML={{ __html: details.content }}
        />
        <div className="mb-4">
          <Tag category="hashtag" name="string" />
        </div>
        <span className="w-full border block border-gray10" />
      </section>
      <SideButton />
    </main>
  );
}
