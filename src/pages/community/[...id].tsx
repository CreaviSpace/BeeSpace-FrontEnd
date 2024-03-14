import { useRouter } from 'next/router';

import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import SkeletonDetail from '@/components/skeleton/SkeletonDetail';
import Tag from '@/components/Tag';
import useCommunityDetail from '@/hooks/useCommunityDetail';

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
    <main>
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        <section className="max-w-max_w m-auto py-16 px-8 relative mb-5">
          <DetailsTitle
            type="community"
            time={data.modifiedDate}
            views={data.viewCount}
            title={data.title}
            likes={3}
            userName="author"
            category={data.category}
          />
          {/* <SideButton /> */}
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
            <CommentContainer />
          </div>
        </section>
      )}
    </main>
  );
}
