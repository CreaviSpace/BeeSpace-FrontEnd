import Link from 'next/link';

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
      <section className="h-fit mx-auto py-16">
        <div className="max-w-max_w h-fit grid grid-cols-2 mx-auto mt-10 tablet:grid-cols-1 mobile:grid-cols-1">
          <PopularProject />
          <DeadLineRecruitment />
        </div>
        <div className="max-w-max_w mx-auto mt-10">
          <div className="text-bs_24 flex justify-between items-center w-full mb-5 mt-10">
            <h2 className="text-bs_24 font-bold">프로젝트</h2>
            <Link href="/project?type=all" className="text-gray20 text-bs_16">
              더 보기
            </Link>
          </div>
          <ProjectCardContainer />
        </div>
        <div className="w-screen bg-[#F2F2F2] py-10 mt-10">
          <div className="max-w-max_w mx-auto">
            <div className="text-bs_24 flex justify-between items-center w-full mb-5 mt-10">
              <h2 className="text-bs_24 font-bold">모집</h2>
              <Link
                href="/recruitment?type=all"
                className="text-gray20 text-bs_16">
                더 보기
              </Link>
            </div>
            <RecruitmentCardContainer />
          </div>
        </div>
        <div className="max-w-max_w mx-auto mt-10">
          <div className="text-bs_24 flex justify-between items-center w-full mb-5 mt-10">
            <h2 className="text-bs_24 font-bold">커뮤니티</h2>
            <Link href="/community?type=all" className="text-gray20 text-bs_16">
              더 보기
            </Link>
          </div>
          <CommunityCardContainer isActive="main" />
        </div>
      </section>
    </main>
  );
}
