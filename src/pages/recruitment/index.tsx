import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import RecruitmentCardContainer from '@/components/container/RecruitmentCardContainer';

export default function Recruitment() {
  const category = [
    { name: '모집', link: 'project-recruit' },
    { name: '스터디', link: 'study' },
  ];

  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <section>
        <Banner postType="recruitment" />
      </section>
      <Category category={category} btnValue="모집하기" />
      <section className="flex justify-center pt-14 pb-24">
        <RecruitmentCardContainer category={type as string} size={10} />
      </section>
    </main>
  );
}
