import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import RecruitmentCardContainer from '@/components/container/RecruitmentCardContainer';

export default function Recruitment() {
  const category = [
    { name: '모집', link: 'PROJECT_RECRUIT' },
    { name: '스터디', link: 'STUDY' },
  ];

  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <section>
        <Banner postType="recruitment" />
      </section>
      <Category category={category} btnValue="모집하기" />
      <section className="flex justify-center pt-14 pb-24 tablet:px-8 mobile:px-8">
        <RecruitmentCardContainer category={type as string} size={10} />
      </section>
    </main>
  );
}
