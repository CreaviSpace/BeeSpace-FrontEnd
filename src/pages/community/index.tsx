import Category from '@/components/Category';
import CommunityCardContainer from '@/components/container/CommunityCardContainer';
import PopularTag from '@/components/PopularHashTag';
import { usePopularTag } from '@/hooks/usePopularTag';
export default function Community() {
  const categories = [
    {
      name: 'QnA',
      link: 'qna',
    },
    {
      name: '수다',
      link: 'chat',
    },
    {
      name: '고민',
      link: 'worry',
    },
  ];
  const { data, isLoading } = usePopularTag();

  return (
    <main>
      <h1 className="sr-only">커뮤니티 페이지</h1>
      <Category category={categories} btnValue="커뮤니티 글쓰기"></Category>
      <section className="max-w-max_w flex justify-between pt-3 pb-24 m-auto tablet:px-8 mobile:px-8">
        {isLoading ? <></> : <PopularTag tags={data} />}
        <CommunityCardContainer size={6} />
      </section>
    </main>
  );
}
