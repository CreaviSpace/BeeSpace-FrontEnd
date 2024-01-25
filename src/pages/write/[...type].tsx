import { useRouter } from 'next/router';

import RecruitmentWrite from '@/components/write/RecruitmentWrite';

export default function Write() {
  const router = useRouter();
  const { type } = router.query;
  return (
    <div className="py-5">
      {type && type[0] === 'recruitment' && <RecruitmentWrite />}
    </div>
  );
}
