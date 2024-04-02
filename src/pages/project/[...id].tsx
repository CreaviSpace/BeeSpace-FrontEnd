import { useRouter } from 'next/router';

import SideButton from '@/components/button/SideButton';
import DetailsTitle from '@/components/details/DetailsTitle';
import DistributeLink from '@/components/details/project/DistributeLink';
import Members from '@/components/details/project/Members';
import SkillStack from '@/components/details/project/SkillStack';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import Tag from '@/components/Tag';
import useProjectDetail from '@/hooks/useProjectDetail';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, data, isFetching } = useProjectDetail(
    id as string
  );

  return (
    <main className="relative max-w-max_w m-auto p-16 tablet:px-8 mobile:px-8">
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        data?.id && (
          <section>
            <DetailsTitle
              type="project"
              time={data.modifiedDate}
              views={data.viewCount}
              likes={3}
              title={data.title}
              userName="author"
              category={data.category}
              id={data.id}
            />
            <SideButton id={data.id} type={data.postType} />
            <div className="py-8 border-b border-gray10">
              <div
                className="ql_editor"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
            <div className="py-8 border-b border-black">
              <Tag
                name={data.field === 'team' ? '팀 프로젝트' : '개인 프로젝트'}
                category={data.field}
              />
              <Members positions={data.positions} />
              <DistributeLink links={data.links} />
              <SkillStack techStacks={data.techStacks} />
            </div>

            <div className="w-full text-right">
              <button
                className="my-5"
                onClick={() => router.push(`/feedback/${data.id}`)}>
                <Tag name={'설문조사 확인'} category={'individual'} />
              </button>
              <button
                className="my-5"
                onClick={() => router.push(`/feedback/question/${data.id}`)}>
                <Tag name={'설문조사 참여'} category={'team'} />
              </button>
            </div>

            {/* <CommentContainer id={data.id} type={data.postType} /> */}
          </section>
        )
      )}
    </main>
  );
}
