import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import ProjectCardContainer from '@/components/container/ProjectCardContainer';
export default function Project() {
  const categories = [
    {
      name: 'Android',
      link: 'android',
    },
    {
      name: 'Ios',
      link: 'ios',
    },
    {
      name: 'Web',
      link: 'wos',
    },
  ];
  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <h1 className="sr-only">프로젝트 페이지</h1>
      <section>
        <Banner postType="project" />
      </section>
      <Category category={categories} btnValue="프로젝트 올리기" />
      <section className="flex justify-center pt-14 pb-24">
        <ProjectCardContainer category={type as string} />
      </section>
    </main>
  );
}
