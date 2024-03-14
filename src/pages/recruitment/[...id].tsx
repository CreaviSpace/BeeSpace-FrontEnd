import { useRouter } from 'next/router';

import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import RecruitDetails from '@/components/details/recruitment/RecruitDetails';
import RecruitPosition from '@/components/details/recruitment/RecruitPosition';
import TechStackList from '@/components/details/recruitment/TechStackList';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import useRecruitDetail from '@/hooks/useRecruitDetail';

export default function RecruitmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, data, isFetching } = useRecruitDetail(
    id as string
  );

  // const commonDetailsProps = {
  //   className: 'hidden',
  //   time: data.modifiedDate,
  //   views: data.viewCount,
  //   title: data.title,
  //   likes: data.comment,
  //   userName: data.name,
  // };

  return (
    <main className="h-full gap-5 max-w-max_w m-auto py-10 px-16 relative">
      <section className="m-auto max-w-max_w mb-5">
        {isLoading ? (
          <SkeletonDetail />
        ) : (
          <>
            <DetailsTitle
              type="recruitment"
              className="hidden"
              time={data.modifiedDate}
              views={data.viewCount}
              title={data.title}
              likes={data.commont}
              userName={`user`}
            />
            <SideButton />
            <RecruitDetails />
            <div className="p-6 border-b flex justify-between">
              <RecruitPosition />
              <TechStackList />
            </div>
            <div
              className="py-5 px-3 ql_editor"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <span className="w-full border block border-gray10" />
          </>
        )}
      </section>
      <CommentContainer />
    </main>
  );
}
