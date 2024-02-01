import { useRouter } from 'next/router';

import CommunityWrite from '@/components/write/CommunityWrite';
import ProjectWrite from '@/components/write/ProjectWrite';
import RecruitmentWrite from '@/components/write/RecruitmentWrite';

export default function Write() {
  const router = useRouter();
  const { type } = router.query;

  if (!type) {
    return <div>잘못된 페이지</div>;
  }

  const typeString = String(type);

  return (
    <div className="py-5">
      {typeString === 'recruitment' && <RecruitmentWrite />}
      {typeString === 'community' && <CommunityWrite />}
      {typeString === 'project' && <ProjectWrite />}
    </div>
  );
}
