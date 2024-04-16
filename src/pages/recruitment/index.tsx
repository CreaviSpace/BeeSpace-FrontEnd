import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import RecruitmentCardContainer from '@/components/container/RecruitmentCardContainer';

const CATEGORY = [
  { name: '모집', link: 'PROJECT_RECRUIT' },
  { name: '스터디', link: 'STUDY' },
];

const PAGE_SIZE = 24;

export default function Recruitment() {
  const router = useRouter();
  const { type } = router.query;

  return (
    <main>
      <section>
        <Banner postType="recruitment" />
      </section>
      <Category category={CATEGORY} btnValue="팀원 모집하기" />
      <section className="flex justify-center pt-14 pb-24 tablet:px-8 mobile:px-6">
        <RecruitmentCardContainer category={type as string} size={PAGE_SIZE} />
      </section>
    </main>
  );
}
