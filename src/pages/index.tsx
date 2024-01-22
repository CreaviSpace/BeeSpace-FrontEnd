import Banner from '@/components/banner/Banner';
import DeadLineRecruitment from '@/components/DeadLineRecruitment';
import PopularProject from '@/components/PopularProject';
import CommunityCardStyle from '@/components/style/CommunityCardStyle';
import RecruitmentCardStyle from '@/components/style/RecruitmentCardStyle';

import ProjectCardStyle from './../components/style/ProjectCardStyle';

export default function Home() {
  return (
    <main className="mx-auto overflow-hidden">
      <Banner />
      <section className="max-w-max_w h-fit grid grid-cols-2 mx-auto">
        <PopularProject />
        <DeadLineRecruitment />
      </section>
      <section className="max-w-max_w h-fit mx-auto py-16">
        <ProjectCardStyle />
        <RecruitmentCardStyle />
        <CommunityCardStyle isActive="main" />
      </section>
    </main>
  );
}
