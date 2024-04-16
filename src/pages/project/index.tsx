import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import ProjectCardContainer from '@/components/container/ProjectCardContainer';

const CATEGORIES = [
  {
    name: '개인',
    link: 'INDIVIDUAL',
  },
  {
    name: '팀',
    link: 'TEAM',
  },
];

export default function Project() {
  const PAGE_SIZE = 20;

  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <h1 className="sr-only">프로젝트 페이지</h1>
      <section>
        <Banner postType="project" />
      </section>
      <Category category={CATEGORIES} btnValue="프로젝트 올리기" />
      <section className="flex justify-center pt-14 pb-24">
        <ProjectCardContainer category={type as string} size={PAGE_SIZE} />
      </section>
    </main>
  );
}
