import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import ProjectCardContainer from '@/components/container/ProjectCardContainer';
export default function Project() {
  const PAGE_SIZE = 20;
  const categories = [
    {
      name: '개인',
      link: 'individual',
    },
    {
      name: '팀',
      link: 'team',
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
        <ProjectCardContainer category={type as string} size={PAGE_SIZE} />
      </section>
    </main>
  );
}
