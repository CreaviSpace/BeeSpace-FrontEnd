import Category from '@/components/Category';
import CommunityCardContainer from '@/components/container/CommunityCardContainer';
import PopularTag from '@/components/PopularHashTag';
import { usePopularTag } from '@/hooks/usePopularTag';
const CATEGORIES = [
  {
    name: 'QnA',
    link: 'QNA',
  },
  {
    name: '수다',
    link: 'CHAT',
  },
  {
    name: '고민',
    link: 'CONCERN',
  },
];

const PAGE_SIZE = 24;

export default function Community() {
  const { data, isLoading } = usePopularTag();

  return (
    <main>
      <h1 className="sr-only">커뮤니티 페이지</h1>
      <Category category={CATEGORIES} btnValue="커뮤니티 글쓰기"></Category>
      <section className="max-w-max_w flex justify-between pt-3 pb-24 m-auto tablet:px-8 mobile:px-6 mobile:flex-col">
        {isLoading ? (
          <div className="w-[18.75rem] h-fit mt-6">
            <h3 className="font-bold mb-3">인기 태그</h3>
          </div>
        ) : (
          <PopularTag tags={data} />
        )}
        <CommunityCardContainer size={PAGE_SIZE} />
      </section>
    </main>
  );
}
