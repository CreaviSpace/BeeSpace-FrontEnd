import Banner from '@/components/banner/Banner';
import DeadLineRecruitment from '@/components/DeadLineRecruitment';

import CommunityCardStyle from './../components/CommunityCardStyle';

export default function Home() {
  return (
    <main className="w-max_w mx-auto overflow-hidden">
      <Banner />
      <DeadLineRecruitment />
      <CommunityCardStyle />
      <section className="max-w-max_w h-fit flex justify-between items-center mx-auto">
        <DeadLineRecruitment />
      </section>
    </main>
  );
}
