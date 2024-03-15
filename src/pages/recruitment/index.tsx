import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import RecruitmentCardContainer from '@/components/container/RecruitmentCardContainer';

interface IRecruitKind {
  recruitment: string;
}
export default function Recruitment({ recruitment }: IRecruitKind) {
  const category = [
    { name: '프로젝트', link: 'project' },
    { name: '스터디', link: 'study' },
  ];

  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <section>
        <Banner postType="recruitment" />
      </section>
      <Category category={category} btnValue="프로젝트 올리기" />
      <section className="flex justify-center pt-14 pb-24">
        <RecruitmentCardContainer postType={type as string} />
      </section>
    </main>
  );
}
