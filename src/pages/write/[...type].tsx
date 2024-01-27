import { useRouter } from 'next/router';

import CommunityWrite from '@/components/write/CommunityWrite';
import RecruitmentWrite from '@/components/write/RecruitmentWrite';

export default function Write() {
  const router = useRouter();
  const { type } = router.query;

  if (!type) {
    return <div>잘못된 페이지</div>;
  }

  if (!type) {
    return <div>잘못된 페이지</div>;
  }

  return (
    <div className="py-5">
      {type[0] === 'recruitment' && <RecruitmentWrite />}
      {type[1] === 'community' && <CommunityWrite />}
    </div>
  );
}
