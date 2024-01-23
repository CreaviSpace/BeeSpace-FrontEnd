import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import ProjectCardStyle from '@/components/style/ProjectCardStyle';
export default function Project() {
  const categories = [
    {
      name: '프론트엔드',
      link: '/',
    },
    {
      name: '백엔드',
      link: '/',
    },
    {
      name: '기획',
      link: '/',
    },
  ];
  return (
    <main>
      <h1 className="sr-only">프로젝트 페이지</h1>
      <section>
        <Banner />
      </section>

      <Category category={categories} btnValue="프로젝트 올리기"></Category>
      <section className="flex justify-center pt-3 pb-24">
        <ProjectCardStyle />
      </section>
    </main>
  );
}
