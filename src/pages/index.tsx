import Banner from '@/components/banner/Banner';
import DeadLineRecruitment from '@/components/DeadLineRecruitment';

import CommunityCardStyle from './../components/CommunityCardStyle';
import Tag from './../components/Tag';

export default function Home() {
  return (
    <main className="w-max_w mx-auto overflow-hidden">
      <Banner />
      <DeadLineRecruitment />
      <Tag name="소셜 네트워크" category="projectField" />
      <Tag name="팀 프로젝트" category="team" />
      <CommunityCardStyle />
    </main>
  );
}
