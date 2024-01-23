import Banner from '@/components/banner/Banner';
import CommunityCardContainer from '@/components/container/CommunityCardContainer';
import DeadLineRecruitment from '@/components/container/DeadLineContainer';
import PopularProject from '@/components/container/PopularContainer';
import ProjectCardContainer from '@/components/container/ProjectCardContainer';
import RecruitmentCardContainer from '@/components/container/RecruitmentCardContainer';

export default function Home() {
  return (
    <main className="mx-auto overflow-hidden">
      <Banner />
      <section className="max-w-max_w h-fit mx-auto py-16">
        <div className="max-w-max_w h-fit grid grid-cols-2 mx-auto mt-10 tablet:grid-cols-1 mobile:grid-cols-1">
          <PopularProject />
          <DeadLineRecruitment />
        </div>
        <h2 className="text-bs_24 font-bold mb-7 mt-10">프로젝트</h2>
        <ProjectCardContainer />
        <h2 className="text-bs_24 font-bold mb-7 mt-10">모집</h2>
        <RecruitmentCardContainer />
        <h2 className="text-bs_24 font-bold mb-7 mt-10">커뮤니티</h2>
        <CommunityCardContainer isActive="main" />
      </section>
    </main>
  );
}
