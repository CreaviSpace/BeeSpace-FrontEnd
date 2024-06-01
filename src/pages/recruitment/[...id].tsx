import { useRouter } from 'next/router';

import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import RecruitDetails from '@/components/details/recruitment/RecruitDetails';
import RecruitPosition from '@/components/details/recruitment/RecruitPosition';
import TechStackList from '@/components/details/recruitment/TechStackList';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import { useGetRecruitPost } from '@/hooks/queries/post/useGetPost';

export default function RecruitmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data } = useGetRecruitPost('recruit', id as string);

  return (
    <main className="h-full gap-5 max-w-max_w min-h-min_h m-auto py-10 px-16 relative mobile:px-4">
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        data?.id && (
          <section className="m-auto max-w-max_w mb-5">
            <DetailsTitle
              id={data.id}
              memberId={data.memberId}
              type="recruit"
              time={data.createdDate}
              views={data.viewCount}
              title={data.title}
              userName={data.memberNickName}
              imageURL={data.memberProfile}
              hidden="sr-only"
            />
            <SideButton id={data.id} type={data.postType} hidden={true} />
            <RecruitDetails
              category={data.category}
              contactWay={data.contactWay}
              contact={data.contact}
              amount={data.amount}
              proceedWay={data.proceedWay}
              workDay={data.workDay}
              end={data.end}
            />
            <div className="p-6 border-b flex justify-between mobile:flex-col gap-10">
              <RecruitPosition positions={data.positions} />
              <TechStackList techStacks={data.techStacks} />
            </div>
            <div
              className="py-5 px-3 ql_editor"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <span className="w-full border block border-gray10 mb-5" />
            <CommentContainer id={data.id} type={data.postType} />
          </section>
        )
      )}
    </main>
  );
}
