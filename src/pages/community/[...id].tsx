import { useRouter } from 'next/router';

import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import Tag from '@/components/Tag';
import useCommunityDetail from '@/hooks/community/useCommunityDetail';
import { parseValue } from '@/utils/parseValue';

interface IhashTagsItem {
  hashTagId: number;
  hashTag: string;
}

export default function CommunityDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, isFetching } = useCommunityDetail(
    id as string
  );

  return (
    <main className="max-w-max_w m-auto p-16 relative mb-5 tablet:px-8 mobile:px-6">
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        data?.id && (
          <section>
            <DetailsTitle
              type="community"
              time={data.modifiedDate}
              views={data.viewCount}
              title={data.title}
              userName={data.memberNickName}
              category={parseValue(data.category)}
              id={data.id}
              imageURL={data.memberProfile}
              memberId={data.memberId}
            />
            <SideButton id={data.id} type={data.postType} />
            <div
              className="ql_editor"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="mb-4">
              {data.hashTags?.map((item: IhashTagsItem) => (
                <Tag
                  key={item.hashTagId}
                  category="hashtag"
                  name={item.hashTag}
                />
              ))}
            </div>
            <span className="w-full border block border-gray10" />
            <div className="mt-8">
              <CommentContainer id={data.id} type={data.postType} />
            </div>
          </section>
        )
      )}
    </main>
  );
}
