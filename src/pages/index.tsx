import Banner from '@/components/banner/Banner';
import DeadLineRecruitment from '@/components/DeadLineRecruitment';
import PopularProject from '@/components/PopularProject';
import CommunityCardStyle from '@/components/style/CommunityCardStyle';

import ProjectCardStyle from './../components/style/ProjectCardStyle';

export default function Home() {
  return (
    <main className="mx-auto overflow-hidden">
      <Banner />
      <section className="max-w-max_w h-fit flex justify-between items-center mx-auto">
        <PopularProject />
        <DeadLineRecruitment />
      </section>
      <section className="max-w-max_w h-fit mx-auto py-16">
        <h2 className="text-bs_24 font-bold mb-7">프로젝트</h2>
        <ProjectCardStyle />
        <h2 className="text-bs_24 font-bold mb-7">커뮤니티</h2>
        <CommunityCardStyle isActive="main" />
      </section>
    </main>
  );
}
