import { useRouter } from 'next/router';

import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import DistributeLink from '@/components/details/project/DistributeLink';
import Members from '@/components/details/project/Members';
import SkillStack from '@/components/details/project/SkillStack';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import Tag from '@/components/Tag';
import { useGetProjectPost } from '@/hooks/queries/post/useGetPost';
import useCookie from '@/hooks/useCookie';
import useLoginStore from '@/store/useLoginStore';
import { parseValue } from '@/utils/parseValue';

import Custom404 from '../404';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { login } = useLoginStore();
  const { getCookies } = useCookie(['MID']);
  const MID = getCookies('MID');

  const { isLoading, isError, data } = useGetProjectPost(
    'project',
    id ? String(id) : undefined
  );

  if (isError) {
    return <Custom404 />;
  }

  return (
    <main className="relative max-w-max_w min-h-min_h m-auto p-16 tablet:px-8 mobile:px-6">
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        data?.id && (
          <section>
            <DetailsTitle
              type="project"
              time={data.createdDate}
              views={data.viewCount}
              title={data.title}
              userName={data.memberNickName}
              category={data.field}
              id={data.id}
              imageURL={data.memberProfile}
              memberId={data.memberId}
            />
            <SideButton id={data.id} type={data.postType} />
            <div className="py-8 border-b border-gray10">
              <div
                className="ql_editor"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
            <div className="py-8 border-b border-black overflow-x-auto">
              <Tag
                name={`${parseValue(data.category)}프로젝트`}
                category={data.category === 'TEAM' ? 'TEAM' : 'INDIVIDUAL'}
              />
              <Members positions={data.positions} />
              <DistributeLink links={data.links} />
              <SkillStack techStacks={data.techStacks} />
            </div>

            <div className="w-full text-right">
              {login && MID === data.memberId && (
                <>
                  <button
                    className="my-5"
                    onClick={() =>
                      router.push(`/feedback/question/${data.id}`)
                    }>
                    <Tag name={'설문조사 작성'} category={'TEAM'} />
                  </button>
                  <button
                    className="my-5"
                    onClick={() =>
                      router.push(`/feedback/analysis/${data.id}`)
                    }>
                    <Tag name={'설문조사 확인'} category={'TEAM'} />
                  </button>
                </>
              )}

              <button
                className="my-5"
                onClick={() => router.push(`/feedback/${data.id}`)}>
                <Tag name={'설문조사 참여'} category={'INDIVIDUAL'} />
              </button>
            </div>
            <CommentContainer id={data.id} type={data.postType} />
          </section>
        )
      )}
    </main>
  );
}
