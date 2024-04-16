import { useRouter } from 'next/router';

import CommunityWrite from '@/components/write/CommunityWrite';
import ProjectWrite from '@/components/write/ProjectWrite';
import RecruitmentWrite from '@/components/write/RecruitmentWrite';

export default function Write() {
  const router = useRouter();
  const { type, id } = router.query;

  if (!type) {
    return <div>잘못된 페이지</div>;
  }

  const typeString = String(type);

  return (
    <div className="py-5">
      {typeString === 'recruitment' && (
        <RecruitmentWrite id={id as string | undefined} />
      )}
      {typeString === 'community' && (
        <CommunityWrite id={id as string | undefined} />
      )}
      {typeString === 'project' && (
        <ProjectWrite id={id as string | undefined} />
      )}
    </div>
  );
}
