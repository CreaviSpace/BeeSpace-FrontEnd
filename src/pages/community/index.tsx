import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import CommunityCardStyle from '@/components/container/CommunityCardContainer';
import PopularTag from '@/components/PopularHashTag';
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
  return (
    <main>
      <h1 className="sr-only">커뮤니티 페이지</h1>
      <section>
        <Banner />
      </section>
      <Category category={categories} btnValue="커뮤니티 글쓰기"></Category>
      <section className="max-w-max_w flex justify-between pt-3 pb-24 m-auto">
        <PopularTag />
        <CommunityCardStyle />
      </section>
    </main>
  );
}
